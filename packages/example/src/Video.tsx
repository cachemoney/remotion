import {alias} from 'lib/alias';
import React from 'react';
import {Composition, Folder, getInputProps, Still} from 'remotion';
import {TwentyTwoKHzAudio} from './22KhzAudio';
import BetaText from './BetaText';
import {CancelRender} from './CancelRender';
import {ColorInterpolation} from './ColorInterpolation';
import {MyCtx, WrappedInContext} from './Context';
import CorruptVideo from './CorruptVideo';
import {ErrorOnFrame10} from './ErrorOnFrame10';
import {Expert} from './Expert';
import {FontDemo} from './Fonts';
import {Framer} from './Framer';
import {FreezeExample} from './Freeze/FreezeExample';
import {ManyAudio} from './ManyAudio';
import {MissingImg} from './MissingImg';
import {OffthreadRemoteVideo} from './OffthreadRemoteVideo/OffthreadRemoteVideo';
import {OrbScene} from './Orb';
import InfinityVideo from './ReallyLongVideo';
import RemoteVideo from './RemoteVideo';
import {ScalePath} from './ScalePath';
import {Scripts} from './Scripts';
import CircleTest from './Shapes/CircleTest';
import EllipseTest from './Shapes/EllipseTest';
import RectTest from './Shapes/RectTest';
import StarTest from './Shapes/StarTest';
import TriangleTest from './Shapes/TriangleTest';
import {SkipZeroFrame} from './SkipZeroFrame';
import {BaseSpring, SpringWithDuration} from './Spring/base-spring';
import {SeriesTesting} from './StaggerTesting';
import {StaticDemo} from './StaticServer';
import {StillZoom} from './StillZoom';
import {TenFrameTester} from './TenFrameTester';
import ThreeBasic from './ThreeBasic';
import {VideoOnCanvas} from './VideoOnCanvas';
import {Greenscreen} from './VideoOnCanvas/greenscreen';
import {VideoSpeed} from './VideoSpeed';
import {VideoTesting} from './VideoTesting';
import {WarpDemo} from './WarpText';
import {WarpDemo2} from './WarpText/demo2';

if (alias !== 'alias') {
	throw new Error('should support TS aliases');
}

// Use it to test that UI does not regress on weird CSS
// import './weird-css.css';

export const Index: React.FC = () => {
	const inputProps = getInputProps();
	return (
		<>
			<Folder name="components">
				<Composition
					id="looped"
					lazyComponent={() => import('./LoopedVideo')}
					durationInFrames={200}
					fps={60}
					height={1080}
					width={1080}
				/>
				<Composition
					fps={30}
					id="cancel-render"
					width={920}
					height={720}
					component={CancelRender}
					durationInFrames={100}
				/>
				<Composition
					id="iframe"
					lazyComponent={() => import('./IframeTest')}
					width={1080}
					height={1080}
					fps={30}
					durationInFrames={10}
				/>
				<Composition
					id="stagger-test"
					component={SeriesTesting}
					width={1280}
					height={720}
					fps={30}
					durationInFrames={100}
				/>
				<Composition
					id="freeze-example"
					component={FreezeExample}
					width={1280}
					height={720}
					fps={30}
					durationInFrames={300}
				/>
			</Folder>
			<Folder name="spring">
				<Composition
					id="base-spring"
					component={BaseSpring}
					width={1080}
					height={1080}
					fps={30}
					durationInFrames={100}
				/>
				<Composition
					id="spring-with-duration"
					component={SpringWithDuration}
					width={1080}
					height={1080}
					fps={30}
					durationInFrames={100}
				/>
			</Folder>
			<Folder name="regression-testing">
				<Composition
					id="missing-img"
					component={MissingImg}
					width={1080}
					height={1080}
					fps={30}
					durationInFrames={10}
				/>
				<Composition
					id="ten-frame-tester"
					component={TenFrameTester}
					width={1080}
					height={1080}
					fps={30}
					durationInFrames={10}
				/>

				<Composition
					id="framer"
					component={Framer}
					width={1080}
					height={1080}
					fps={30}
					durationInFrames={100}
				/>
				<Composition
					id="skip-zero-frame"
					component={SkipZeroFrame}
					width={1280}
					height={720}
					fps={30}
					durationInFrames={100}
				/>
				<Composition
					id="scripts"
					component={Scripts}
					width={1280}
					height={720}
					fps={30}
					durationInFrames={100}
				/>
				<Composition
					id="many-audio"
					component={ManyAudio}
					width={1280}
					height={720}
					fps={30}
					durationInFrames={30}
				/>
				<Composition
					id="error-on-frame-10"
					component={ErrorOnFrame10}
					width={1280}
					height={720}
					fps={30}
					durationInFrames={1000000}
				/>
				<MyCtx.Provider
					value={{
						hi: () => 'hithere',
					}}
				>
					<Still
						id="wrapped-in-context"
						component={WrappedInContext}
						width={1280}
						height={720}
					/>
				</MyCtx.Provider>
			</Folder>
			<Folder name="creatives">
				<Composition
					id="drop-dots"
					lazyComponent={() => import('./DropDots/DropDots')}
					width={1080}
					height={1080}
					fps={30}
					durationInFrames={180 * 30}
				/>
				<Composition
					id="tiles"
					lazyComponent={() => import('./Tiles')}
					width={1080}
					height={1920}
					fps={30}
					durationInFrames={90}
				/>
				<Composition
					id="title"
					lazyComponent={() => import('./Title')}
					width={1080}
					height={1920}
					fps={30}
					durationInFrames={90}
					defaultProps={{
						line1: 'Test',
						line2: 'text',
					}}
				/>
				<Composition
					id="beta-text"
					component={BetaText}
					width={1080}
					height={1080}
					fps={30}
					durationInFrames={3 * 30}
					defaultProps={{
						word1: getInputProps().word1,
					}}
				/>
				<Composition
					id="react-svg"
					lazyComponent={() => import('./ReactSvg')}
					width={1920}
					height={1080}
					fps={60}
					durationInFrames={300}
					defaultProps={{
						transparent: true,
					}}
				/>
			</Folder>
			<Folder name="video-tests">
				<Composition
					id="video-testing-mp4"
					component={VideoTesting}
					width={1080}
					height={1080}
					fps={30}
					durationInFrames={100}
					defaultProps={{
						offthread: false,
						codec: 'mp4' as const,
					}}
				/>
				<Composition
					id="video-testing-mp4-offthread"
					component={VideoTesting}
					width={1080}
					height={1080}
					fps={30}
					durationInFrames={100}
					defaultProps={{
						offthread: true,
						codec: 'mp4' as const,
					}}
				/>
				<Composition
					id="OffthreadRemoteVideo"
					component={OffthreadRemoteVideo}
					width={1080}
					height={1080}
					fps={30}
					durationInFrames={100}
				/>
				<Composition
					id="video-testing-webm"
					component={VideoTesting}
					width={1080}
					height={1080}
					fps={30}
					durationInFrames={100}
					defaultProps={{
						offthread: false,
						codec: 'webm' as const,
					}}
				/>
				<Composition
					id="video-testing-webm-offthread"
					component={VideoTesting}
					width={1080}
					height={1080}
					fps={30}
					durationInFrames={100}
					defaultProps={{
						offthread: true,
						codec: 'webm' as const,
					}}
				/>
				<Composition
					id="remote-video"
					component={RemoteVideo}
					width={1280}
					height={720}
					fps={30}
					durationInFrames={600}
				/>
				<Composition
					id="corrupt-video"
					component={CorruptVideo}
					width={1280}
					height={720}
					fps={30}
					durationInFrames={2000}
				/>
				<Composition
					id="2hrvideo"
					component={InfinityVideo}
					width={1920}
					height={1080}
					fps={30}
					durationInFrames={2 * 60 * 60 * 30}
				/>

				<Composition
					id="video-speed"
					component={VideoSpeed}
					width={1280}
					height={720}
					fps={30}
					durationInFrames={100}
				/>
				<Composition
					id="video-on-canvas"
					component={VideoOnCanvas}
					width={1920}
					height={1080}
					fps={30}
					durationInFrames={100}
				/>
				<Composition
					id="greenscreen"
					component={Greenscreen}
					width={1920}
					height={1080}
					fps={30}
					durationInFrames={100}
				/>
			</Folder>
			<Folder name="still-tests">
				<Still
					id="still-zoom"
					component={StillZoom}
					width={1800}
					height={2200}
				/>
			</Folder>
			<Folder name="features">
				<Composition
					id="mdx-test"
					lazyComponent={() => import('./MdxTest')}
					width={1080}
					height={1080}
					fps={30}
					durationInFrames={30 * 30}
				/>
				<Composition
					id="color-interpolation"
					component={ColorInterpolation}
					width={1280}
					height={720}
					fps={30}
					durationInFrames={100}
				/>
				<Still
					id="static-demo"
					component={StaticDemo}
					width={1000}
					height={1000}
				/>
				<Still id="font-demo" component={FontDemo} width={1000} height={1000} />
				<Composition
					id="dynamic-duration"
					component={VideoTesting}
					width={1080}
					height={1080}
					fps={30}
					// Change the duration of the video dynamically by passing
					// `--props='{"duration": 100}'`
					durationInFrames={inputProps?.duration ?? 20}
				/>
				<Composition
					id="nested"
					lazyComponent={() => import('./NestedSequences')}
					durationInFrames={200}
					fps={60}
					height={1080}
					width={1080}
				/>
			</Folder>
			<Folder name="audio-tests">
				<Composition
					id="22khz"
					component={TwentyTwoKHzAudio}
					width={1920}
					height={1080}
					fps={30}
					durationInFrames={90}
				/>
				<Composition
					id="offline-audio-buffer"
					lazyComponent={() => import('./OfflineAudioBuffer')}
					width={1080}
					height={1080}
					fps={30}
					durationInFrames={100}
				/>
				<Composition
					id="audio-testing-mute"
					lazyComponent={() => import('./AudioTestingMute')}
					width={1080}
					height={1080}
					fps={30}
					durationInFrames={300}
				/>
				<Composition
					id="audio-testing"
					lazyComponent={() => import('./AudioTesting')}
					width={1080}
					height={1080}
					fps={30}
					durationInFrames={300}
				/>
				<Composition
					id="audio-testing-amplify"
					lazyComponent={() => import('./AudioTesting/Amplify')}
					width={1080}
					height={1080}
					fps={30}
					durationInFrames={120}
				/>
				<Composition
					id="audio-testing-base64"
					lazyComponent={() => import('./AudioTesting/Base64')}
					width={1080}
					height={1080}
					fps={30}
					durationInFrames={300}
				/>
				<Composition
					id="audio-visualization"
					lazyComponent={() => import('./AudioVisualization')}
					width={1080}
					height={1080}
					fps={30}
					durationInFrames={180 * 30}
				/>
				<Composition
					id="loop-audio"
					lazyComponent={() => import('./LoopAudio')}
					width={1080}
					height={1080}
					fps={30}
					durationInFrames={180 * 30}
				/>
			</Folder>
			<Folder name="three">
				<Still id="Orb" component={OrbScene} width={2000} height={2000} />
				<Composition
					id="three-basic"
					component={ThreeBasic}
					width={1280}
					height={720}
					fps={30}
					durationInFrames={600}
				/>
			</Folder>
			<Folder name="lottie">
				<Composition
					id="cybertruck"
					lazyComponent={() => import('./Lottie/Cybertruck')}
					durationInFrames={500}
					fps={30}
					height={850}
					width={850}
				/>
				<Composition
					id="halloween-balloons"
					lazyComponent={() => import('./Lottie/Halloween/Balloons')}
					durationInFrames={90}
					fps={30}
					height={1080}
					width={1080}
				/>
				<Composition
					id="halloween-pumpkin"
					lazyComponent={() => import('./Lottie/Halloween/Pumpkin')}
					durationInFrames={150}
					fps={30}
					height={1200}
					width={1600}
				/>
				<Composition
					id="exploding-bird"
					lazyComponent={() => import('./Lottie/ExplodingBird')}
					durationInFrames={300}
					fps={30}
					height={850}
					width={850}
				/>
				<Composition
					id="image-in-lottie"
					lazyComponent={() => import('./Lottie/ImageInLottie')}
					durationInFrames={300}
					fps={30}
					height={850}
					width={850}
				/>
				<Composition
					id="loader"
					lazyComponent={() => import('./Lottie/Loader')}
					durationInFrames={240}
					fps={60}
					height={576}
					width={576}
				/>
			</Folder>
			<Folder name="paths">
				<Composition
					id="path-evolve"
					lazyComponent={() => import('./Paths/PathEvolve')}
					durationInFrames={500}
					fps={30}
					height={1080}
					width={1080}
				/>
				<Composition
					id="path-morph"
					lazyComponent={() => import('./Paths/PathMorph')}
					durationInFrames={500}
					fps={30}
					height={1080}
					width={1080}
				/>
				<Composition
					id="scale-path"
					component={ScalePath}
					durationInFrames={500}
					fps={30}
					height={1080}
					width={1080}
				/>
				<Composition
					id="path-warp"
					component={WarpDemo}
					durationInFrames={500}
					fps={30}
					height={1080}
					width={1080}
				/>
				<Composition
					id="path-warp-2"
					component={WarpDemo2}
					durationInFrames={500}
					fps={30}
					height={1080}
					width={1080}
				/>
			</Folder>
			<Folder name="gif">
				<Composition
					id="gif"
					lazyComponent={() => import('./GifTest')}
					width={1080}
					height={1080}
					fps={30}
					durationInFrames={200}
				/>
				<Composition
					id="gif-duration"
					lazyComponent={() => import('./GifTest/gif-duration')}
					width={1080}
					height={1080}
					fps={30}
					durationInFrames={150}
				/>
				<Composition
					id="gif-fill-modes"
					lazyComponent={() => import('./GifTest/fill-modes')}
					width={1920}
					height={1080}
					fps={30}
					durationInFrames={150}
				/>
				<Composition
					id="gif-loop-behavior"
					lazyComponent={() => import('./GifTest/loop-behavior')}
					width={1920}
					height={1080}
					fps={30}
					durationInFrames={540}
				/>
			</Folder>
			<Folder name="og-images">
				<Composition
					id="expert"
					component={Expert}
					width={1200}
					height={630}
					fps={30}
					durationInFrames={150}
				/>
			</Folder>

			<Folder name="shapes">
				<Composition
					id="circle-test"
					component={CircleTest}
					width={1200}
					height={630}
					fps={30}
					durationInFrames={150}
				/>
				<Composition
					id="rect-test"
					component={RectTest}
					width={1200}
					height={630}
					fps={30}
					durationInFrames={150}
				/>
				<Composition
					id="triangle-test"
					component={TriangleTest}
					width={1200}
					height={630}
					fps={30}
					durationInFrames={150}
				/>
				<Composition
					id="ellipse-test"
					component={EllipseTest}
					width={1200}
					height={630}
					fps={30}
					durationInFrames={150}
				/>
				<Composition
					id="star-test"
					component={StarTest}
					width={1200}
					height={630}
					fps={30}
					durationInFrames={150}
				/>
			</Folder>
		</>
	);
};
