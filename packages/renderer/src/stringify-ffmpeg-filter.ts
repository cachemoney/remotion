import {Internals} from 'remotion';
import {calculateATempo} from './assets/calculate-atempo';
import {ffmpegVolumeExpression} from './assets/ffmpeg-volume-expression';
import {AssetVolume} from './assets/types';

export const stringifyFfmpegFilter = ({
	trimLeft,
	trimRight,
	startInVideo,
	volume,
	fps,
	playbackRate,
	durationInFrames,
}: {
	trimLeft: number;
	trimRight: number;
	startInVideo: number;
	volume: AssetVolume;
	fps: number;
	durationInFrames: number;
	playbackRate: number;
}) => {
	const startInVideoSeconds = startInVideo / fps;

	const volumeFilter = ffmpegVolumeExpression({
		volume,
		startInVideo,
		fps,
	});
	const durationInSeconds = durationInFrames / fps;
	const trimDuration = trimRight - trimLeft;

	const needsExtendingInEnd =
		durationInSeconds - trimDuration - startInVideoSeconds > 0.00000001;

	// Avoid setting filters if possible, as combining them can create noise

	return (
		`[0:a]` +
		[
			// Order matters! First trim the audio
			`atrim=${trimLeft.toFixed(6)}:${trimRight.toFixed(6)}`,
			// then set the tempo
			calculateATempo(playbackRate),
			// We delay up to 10 channels.
			// Audio usually does not have more than than that and FFMEPG docs state:
			// "Unused delays will be silently ignored."
			// https://ffmpeg.org/ffmpeg-filters.html#adelay
			startInVideoSeconds === 0
				? null
				: `adelay=${new Array(10)
						.fill((startInVideoSeconds * 1000).toFixed(0))
						.join('|')}`,
			// set the volume if needed
			volumeFilter.value === '1'
				? null
				: `volume=${volumeFilter.value}:eval=${volumeFilter.eval}`,

			// Only in the end, we pad to the full length.
			needsExtendingInEnd
				? 'apad=whole_dur=' + (durationInFrames / fps).toFixed(6)
				: null,
		]
			.filter(Internals.truthy)
			.join(',') +
		`[a0]`
	);
};
