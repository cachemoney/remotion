import {calculateCanvasTransformation, calculateScale} from './calculate-scale';
import {PlayerEventEmitterContext} from './emitter-context';
import type {CallbackListener, PlayerEventTypes} from './event-emitter';
import {PlayerEmitter} from './event-emitter';
import {useHoverState} from './use-hover-state';
import {usePlayback} from './use-playback';
import {usePlayer} from './use-player';
import {updateAllElementsSizes, useElementSize} from './utils/use-element-size';

export {Player, PlayerProps} from './Player';
export {
	PlayerMethods,
	PlayerRef,
	ThumbnailMethods,
	ThumbnailRef,
} from './player-methods';
export type {
	RenderFullscreenButton,
	RenderPlayPauseButton,
} from './PlayerControls';
export type {ErrorFallback, RenderLoading, RenderPoster} from './PlayerUI';
export {Thumbnail} from './Thumbnail';
export {PreviewSize, Translation} from './utils/preview-size';
export {Size} from './utils/use-element-size';
export type {CallbackListener, PlayerEventTypes as EventTypes};

export const PlayerInternals = {
	PlayerEventEmitterContext,
	PlayerEmitter,
	usePlayer,
	usePlayback,
	useElementSize,
	calculateCanvasTransformation,
	useHoverState,
	updateAllElementsSizes,
	calculateScale,
};
