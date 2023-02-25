import type {Codec} from './codec';
import {getCodecName} from './get-codec-name';

type MediaSupport = {
	video: boolean;
	audio: boolean;
};

const support: {[key in Codec]: MediaSupport} = {
	'h264-mkv': {
		audio: true,
		video: true,
	},
	aac: {
		audio: true,
		video: false,
	},
	gif: {
		video: true,
		audio: false,
	},
	h264: {
		video: true,
		audio: true,
	},
	h265: {
		video: true,
		audio: true,
	},
	mp3: {
		audio: true,
		video: false,
	},
	prores: {
		audio: true,
		video: true,
	},
	vp8: {
		audio: true,
		video: true,
	},
	vp9: {
		audio: true,
		video: true,
	},
	wav: {
		audio: true,
		video: false,
	},
};

export const codecSupportsMedia = (codec: Codec): MediaSupport => {
	return support[codec];
};

export const codecSupportsCrf = (codec: Codec) => {
	const encoderName = getCodecName(codec);
	const supportsCrf = encoderName && codec !== 'prores';
	return supportsCrf;
};
