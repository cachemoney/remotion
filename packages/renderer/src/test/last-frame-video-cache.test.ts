import crypto from 'crypto';
import {expect, test} from 'vitest';
import type {DownloadMap} from '../assets/download-map';
import {makeDownloadMap} from '../assets/download-map';
import type {LastFrameOptions} from '../last-frame-from-video-cache';
import {
	clearLastFileCache,
	getLastFrameFromCache,
	setLastFrameInCache,
} from '../last-frame-from-video-cache';

const makeKey = (
	id: string,
	downloadMap: DownloadMap,
	remotionRoot: string
): LastFrameOptions => {
	return {
		ffmpegExecutable: null,
		ffprobeExecutable: null,
		offset: 10,
		src: id,
		imageFormat: 'jpeg',
		specialVCodecForTransparency: 'none',
		needsResize: null,
		downloadMap,
		remotionRoot,
	};
};

test('Last frame video cache', () => {
	const downloadMap = makeDownloadMap();
	expect(getLastFrameFromCache(makeKey('1', downloadMap, process.cwd()))).toBe(
		null
	);

	const buf = crypto.randomBytes(10 * 1024 * 1024);
	setLastFrameInCache(makeKey('1', downloadMap, process.cwd()), buf);
	expect(
		getLastFrameFromCache(makeKey('1', downloadMap, process.cwd()))?.byteLength
	).toBe(10 * 1024 * 1024);
	setLastFrameInCache(makeKey('2', downloadMap, process.cwd()), buf);
	setLastFrameInCache(makeKey('3', downloadMap, process.cwd()), buf);
	setLastFrameInCache(makeKey('4', downloadMap, process.cwd()), buf);
	setLastFrameInCache(makeKey('5', downloadMap, process.cwd()), buf);
	setLastFrameInCache(makeKey('6', downloadMap, process.cwd()), buf);

	expect(
		getLastFrameFromCache(makeKey('1', downloadMap, process.cwd()))
			?.byteLength ?? 0
	).toBe(0);
	expect(
		getLastFrameFromCache(makeKey('2', downloadMap, process.cwd()))?.byteLength
	).toBe(10 * 1024 * 1024);
	expect(
		getLastFrameFromCache(makeKey('3', downloadMap, process.cwd()))?.byteLength
	).toBe(10 * 1024 * 1024);
	expect(
		getLastFrameFromCache(makeKey('4', downloadMap, process.cwd()))?.byteLength
	).toBe(10 * 1024 * 1024);
	expect(
		getLastFrameFromCache(makeKey('5', downloadMap, process.cwd()))?.byteLength
	).toBe(10 * 1024 * 1024);
	expect(
		getLastFrameFromCache(makeKey('6', downloadMap, process.cwd()))?.byteLength
	).toBe(10 * 1024 * 1024);

	clearLastFileCache(downloadMap);
});
