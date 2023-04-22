import {expect, test} from 'vitest';
import {createFfmpegMergeFilter} from '../create-ffmpeg-merge-filter';

test('FFMPEG merge filters', async () => {
	const filter = await createFfmpegMergeFilter({
		inputs: [
			{
				filter: {
					pad_end: '300',
					pad_start: null,
				},
				outName: '0.wav',
			},
			{
				filter: {
					pad_end: '600',
					pad_start: null,
				},
				outName: '1.wav',
			},
		],
		ffmpegExecutable: null,
		remotionRoot: process.cwd(),
	});
	expect(
		filter ===
			'[0:a]300,acopy[padded0];[1:a]600,acopy[padded1];[padded0][padded1]amix=inputs=2:dropout_transition=0:normalize=0[outputaudio]' ||
			filter ===
				'[0:a]300,acopy[padded0];[1:a]600,acopy[padded1];[padded0][padded1]amix=inputs=2:dropout_transition=0[outputaudio]'
	).toBeTruthy();
});
