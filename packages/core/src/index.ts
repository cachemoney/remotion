import './asset-types';
import {Clipper} from './Clipper';
import type {TAsset, TCompMetadata} from './CompositionManager';
import type {StaticFile} from './get-static-files';
import {useIsPlayer} from './is-player';
import {checkMultipleRemotionVersions} from './multiple-versions-warning';
import type {ClipRegion} from './NativeLayers';
import {Null} from './Null';

declare global {
	interface Window {
		ready: boolean;
		remotion_cancelledError: string | undefined;
		getStaticCompositions: () => TCompMetadata[];
		setBundleMode: (bundleMode: BundleState) => void;
		remotion_staticBase: string;
		remotion_staticFiles: StaticFile[];
		remotion_editorName: string | null;
		remotion_numberOfAudioTags: number;
		remotion_projectName: string;
		remotion_cwd: string;
		remotion_previewServerCommand: string;
		remotion_setFrame: (frame: number) => void;
		remotion_initialFrame: number;
		remotion_proxyPort: number;
		remotion_audioEnabled: boolean;
		remotion_videoEnabled: boolean;
		remotion_puppeteerTimeout: number;
		remotion_inputProps: string;
		remotion_envVariables: string;
		remotion_collectAssets: () => TAsset[];
		remotion_getClipRegion: () => ClipRegion | null;
		remotion_isPlayer: boolean;
		remotion_isBuilding: undefined | (() => void);
		remotion_finishedBuilding: undefined | (() => void);
		siteVersion: '4';
		remotion_version: string;
		remotion_imported: string | boolean;
	}
}

export type BundleState =
	| {
			type: 'index';
	  }
	| {
			type: 'evaluation';
	  }
	| {
			type: 'composition';
			compositionName: string;
			compositionDefaultProps: unknown;
			compositionHeight: number;
			compositionDurationInFrames: number;
			compositionWidth: number;
			compositionFps: number;
	  };

checkMultipleRemotionVersions();

export * from './AbsoluteFill';
export * from './audio';
export {cancelRender} from './cancel-render';
export * from './Composition';
export {SmallTCompMetadata, TAsset, TCompMetadata} from './CompositionManager';
export {Config, ConfigType} from './config';
export {getInputProps} from './config/input-props';
export {continueRender, delayRender} from './delay-render';
export * from './easing';
export * from './Folder';
export * from './freeze';
export {getStaticFiles, StaticFile} from './get-static-files';
export * from './IFrame';
export * from './Img';
export * from './internals';
export * from './interpolate';
export {interpolateColors} from './interpolate-colors';
export {Loop} from './loop';
export {ClipRegion} from './NativeLayers';
export {prefetch} from './prefetch';
export {random, RandomSeed} from './random';
export {registerRoot} from './register-root';
export {Sequence} from './Sequence';
export {Series} from './series';
export * from './spring';
export {staticFile} from './static-file';
export * from './Still';
export type {PlayableMediaTag} from './timeline-position-state';
export {useCurrentFrame} from './use-current-frame';
export * from './use-video-config';
export * from './version';
export * from './video';
export * from './video-config';

export const Experimental = {
	Clipper,
	Null,
	useIsPlayer,
};

export type WebpackOverrideFn =
	"The 'WebpackOverrideFn' has been moved to '@remotion/bundler'. Update your imports and install '@remotion/bundler' if necessary.";
