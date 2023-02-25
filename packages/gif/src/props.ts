export type GifLoopBehavior =
	| 'loop'
	| 'pause-after-finish'
	| 'unmount-after-finish';

export type RemotionGifProps = {
	src: string;
	width?: number;
	height?: number;
	onLoad?: (info: {
		width: number;
		height: number;
		delays: number[];
		frames: ImageData[];
	}) => void;
	onError?: (error: Error) => void;
	fit?: GifFillMode;
	style?: React.CSSProperties;
	loopBehavior?: GifLoopBehavior;
};

export type GifState = {
	delays: number[];
	frames: ImageData[];
	width: number;
	height: number;
};

export type GifFillMode = 'contain' | 'cover' | 'fill';
