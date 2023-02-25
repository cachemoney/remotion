import {existsSync} from 'fs';
import path from 'path';
import type {RenderMediaOnDownload} from './assets/download-and-map-assets-to-file';
import type {DownloadMap} from './assets/download-map';
import type {FfmpegExecutable} from './ffmpeg-executable';
import {isServeUrl} from './is-serve-url';
import {serveStatic} from './serve-static';
import {waitForSymbolicationToBeDone} from './wait-for-symbolication-error-to-be-done';

export const prepareServer = async ({
	ffmpegExecutable,
	ffprobeExecutable,
	onDownload,
	onError,
	webpackConfigOrServeUrl,
	port,
	downloadMap,
	remotionRoot,
}: {
	webpackConfigOrServeUrl: string;
	onDownload: RenderMediaOnDownload;
	onError: (err: Error) => void;
	ffmpegExecutable: FfmpegExecutable;
	ffprobeExecutable: FfmpegExecutable;
	port: number | null;
	downloadMap: DownloadMap;
	remotionRoot: string;
}): Promise<{
	serveUrl: string;
	closeServer: (force: boolean) => Promise<unknown>;
	offthreadPort: number;
}> => {
	if (isServeUrl(webpackConfigOrServeUrl)) {
		const {port: offthreadPort, close: closeProxy} = await serveStatic(null, {
			onDownload,
			onError,
			ffmpegExecutable,
			ffprobeExecutable,
			port,
			downloadMap,
			remotionRoot,
		});

		return Promise.resolve({
			serveUrl: webpackConfigOrServeUrl,
			closeServer: () => {
				return closeProxy();
			},
			offthreadPort,
		});
	}

	// Check if the path has a `index.html` file
	const indexFile = path.join(webpackConfigOrServeUrl, 'index.html');
	const exists = existsSync(indexFile);
	if (!exists) {
		throw new Error(
			`Tried to serve the Webpack bundle on a HTTP server, but the file ${indexFile} does not exist. Is this a valid path to a Webpack bundle?`
		);
	}

	const {port: serverPort, close} = await serveStatic(webpackConfigOrServeUrl, {
		onDownload,
		onError,
		ffmpegExecutable,
		ffprobeExecutable,
		port,
		downloadMap,
		remotionRoot,
	});
	return Promise.resolve({
		closeServer: async (force: boolean) => {
			if (!force) {
				await waitForSymbolicationToBeDone();
			}

			return close();
		},
		serveUrl: `http://localhost:${serverPort}`,
		offthreadPort: serverPort,
	});
};
