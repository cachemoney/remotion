import fs, {statSync} from 'fs';
import path from 'path';
import type {SmallTCompMetadata} from 'remotion';
import {Internals} from 'remotion';
import type {RenderMediaOnDownload} from './assets/download-and-map-assets-to-file';
import type {DownloadMap} from './assets/download-map';
import {cleanDownloadMap, makeDownloadMap} from './assets/download-map';
import {DEFAULT_BROWSER} from './browser';
import type {BrowserExecutable} from './browser-executable';
import type {Browser as PuppeteerBrowser} from './browser/Browser';
import {convertToPositiveFrameIndex} from './convert-to-positive-frame-index';
import {ensureOutputDirectory} from './ensure-output-directory';
import {handleJavascriptException} from './error-handling/handle-javascript-exception';
import type {FfmpegExecutable} from './ffmpeg-executable';
import {findRemotionRoot} from './find-closest-package-json';
import type {StillImageFormat} from './image-format';
import {validateNonNullImageFormat} from './image-format';
import type {ServeUrlOrWebpackBundle} from './legacy-webpack-config';
import {getServeUrlWithFallback} from './legacy-webpack-config';
import type {CancelSignal} from './make-cancel-signal';
import {cancelErrorMessages} from './make-cancel-signal';
import type {ChromiumOptions} from './open-browser';
import {openBrowser} from './open-browser';
import {prepareServer} from './prepare-server';
import {puppeteerEvaluateWithCatch} from './puppeteer-evaluate';
import {validateQuality} from './quality';
import {seekToFrame} from './seek-to-frame';
import {setPropsAndEnv} from './set-props-and-env';
import {takeFrameAndCompose} from './take-frame-and-compose';
import {validateFrame} from './validate-frame';
import {validatePuppeteerTimeout} from './validate-puppeteer-timeout';
import {validateScale} from './validate-scale';

type InnerStillOptions = {
	composition: SmallTCompMetadata;
	output?: string | null;
	frame?: number;
	inputProps?: unknown;
	imageFormat?: StillImageFormat;
	quality?: number;
	puppeteerInstance?: PuppeteerBrowser;
	dumpBrowserLogs?: boolean;
	envVariables?: Record<string, string>;
	overwrite?: boolean;
	browserExecutable?: BrowserExecutable;
	timeoutInMilliseconds?: number;
	chromiumOptions?: ChromiumOptions;
	scale?: number;
	onDownload?: RenderMediaOnDownload;
	cancelSignal?: CancelSignal;
	ffmpegExecutable?: FfmpegExecutable;
	ffprobeExecutable?: FfmpegExecutable;
	/**
	 * @deprecated Only for Remotion internal usage
	 */
	downloadMap?: DownloadMap;
};

type RenderStillReturnValue = {buffer: Buffer | null};

export type RenderStillOptions = InnerStillOptions &
	ServeUrlOrWebpackBundle & {
		port?: number | null;
	};

const innerRenderStill = async ({
	composition,
	quality,
	imageFormat = 'png',
	serveUrl,
	puppeteerInstance,
	dumpBrowserLogs = false,
	onError,
	inputProps,
	envVariables,
	output,
	frame = 0,
	overwrite = true,
	browserExecutable,
	timeoutInMilliseconds,
	chromiumOptions,
	scale = 1,
	proxyPort,
	cancelSignal,
	downloadMap,
}: InnerStillOptions & {
	downloadMap: DownloadMap;
	serveUrl: string;
	onError: (err: Error) => void;
	proxyPort: number;
}): Promise<RenderStillReturnValue> => {
	Internals.validateDimension(
		composition.height,
		'height',
		'in the `config` object passed to `renderStill()`'
	);
	Internals.validateDimension(
		composition.width,
		'width',
		'in the `config` object passed to `renderStill()`'
	);
	Internals.validateFps(
		composition.fps,
		'in the `config` object of `renderStill()`',
		false
	);
	Internals.validateDurationInFrames(
		composition.durationInFrames,
		'in the `config` object passed to `renderStill()`'
	);
	validateNonNullImageFormat(imageFormat);
	validateFrame(frame, composition.durationInFrames);
	const stillFrame = convertToPositiveFrameIndex({
		durationInFrames: composition.durationInFrames,
		frame,
	});
	validatePuppeteerTimeout(timeoutInMilliseconds);
	validateScale(scale);

	output =
		typeof output === 'string' ? path.resolve(process.cwd(), output) : null;

	if (quality !== undefined && imageFormat !== 'jpeg') {
		throw new Error(
			"You can only pass the `quality` option if `imageFormat` is 'jpeg'."
		);
	}

	validateQuality(quality);

	if (output) {
		if (fs.existsSync(output)) {
			if (!overwrite) {
				throw new Error(
					`Cannot render still - "overwrite" option was set to false, but the output destination ${output} already exists.`
				);
			}

			const stat = statSync(output);

			if (!stat.isFile()) {
				throw new Error(
					`The output location ${output} already exists, but is not a file, but something else (e.g. folder). Cannot save to it.`
				);
			}
		}

		ensureOutputDirectory(output);
	}

	const browserInstance =
		puppeteerInstance ??
		(await openBrowser(DEFAULT_BROWSER, {
			browserExecutable,
			shouldDumpIo: dumpBrowserLogs,
			chromiumOptions,
			forceDeviceScaleFactor: scale ?? 1,
		}));
	const page = await browserInstance.newPage();
	await page.setViewport({
		width: composition.width,
		height: composition.height,
		deviceScaleFactor: scale ?? 1,
	});

	const errorCallback = (err: Error) => {
		onError(err);
		cleanup();
	};

	const cleanUpJSException = handleJavascriptException({
		page,
		onError: errorCallback,
		frame: null,
	});

	const cleanup = async () => {
		cleanUpJSException();

		if (puppeteerInstance) {
			await page.close();
		} else {
			browserInstance.close(true).catch((err) => {
				console.log('Unable to close browser', err);
			});
		}
	};

	cancelSignal?.(() => {
		cleanup();
	});

	await setPropsAndEnv({
		inputProps,
		envVariables,
		page,
		serveUrl,
		initialFrame: stillFrame,
		timeoutInMilliseconds,
		proxyPort,
		retriesRemaining: 2,
		audioEnabled: false,
		videoEnabled: true,
	});

	await puppeteerEvaluateWithCatch({
		// eslint-disable-next-line max-params
		pageFunction: (
			id: string,
			defaultProps: unknown,
			durationInFrames: number,
			fps: number,
			height: number,
			width: number
		) => {
			window.setBundleMode({
				type: 'composition',
				compositionName: id,
				compositionDefaultProps: defaultProps,
				compositionDurationInFrames: durationInFrames,
				compositionFps: fps,
				compositionHeight: height,
				compositionWidth: width,
			});
		},
		args: [
			composition.id,
			composition.defaultProps,
			composition.durationInFrames,
			composition.fps,
			composition.height,
			composition.width,
		],
		frame: null,
		page,
	});
	await seekToFrame({frame: stillFrame, page});

	const {buffer} = await takeFrameAndCompose({
		downloadMap,
		frame: stillFrame,
		freePage: page,
		height: composition.height,
		width: composition.width,
		imageFormat,
		scale,
		output,
		quality,
		wantsBuffer: !output,
	});

	await cleanup();

	return {buffer: output ? null : buffer};
};

/**
 *
 * @description Render a still frame from a composition
 * @link https://www.remotion.dev/docs/renderer/render-still
 */
export const renderStill = (
	options: RenderStillOptions
): Promise<RenderStillReturnValue> => {
	const selectedServeUrl = getServeUrlWithFallback(options);

	const downloadMap = options.downloadMap ?? makeDownloadMap();

	const onDownload = options.onDownload ?? (() => () => undefined);

	const happyPath = new Promise<RenderStillReturnValue>((resolve, reject) => {
		const onError = (err: Error) => reject(err);

		let close: ((force: boolean) => Promise<unknown>) | null = null;

		prepareServer({
			webpackConfigOrServeUrl: selectedServeUrl,
			onDownload,
			onError,
			ffmpegExecutable: options.ffmpegExecutable ?? null,
			ffprobeExecutable: options.ffprobeExecutable ?? null,
			port: options.port ?? null,
			downloadMap,
			remotionRoot: findRemotionRoot(),
		})
			.then(({serveUrl, closeServer, offthreadPort}) => {
				close = closeServer;
				return innerRenderStill({
					...options,
					serveUrl,
					onError: (err) => reject(err),
					proxyPort: offthreadPort,
					downloadMap,
				});
			})

			.then((res) => resolve(res))
			.catch((err) => reject(err))
			.finally(() => {
				// Clean download map if it was not passed in
				if (!options?.downloadMap) {
					cleanDownloadMap(downloadMap);
				}

				return close?.(false);
			});
	});

	return Promise.race([
		happyPath,
		new Promise<RenderStillReturnValue>((_resolve, reject) => {
			options.cancelSignal?.(() => {
				reject(new Error(cancelErrorMessages.renderStill));
			});
		}),
	]);
};
