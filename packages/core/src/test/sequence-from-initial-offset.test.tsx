/**
 * @vitest-environment jsdom
 */

import {render} from '@testing-library/react';
import React from 'react';
import {describe, expect, test} from 'vitest';
import {CanUseRemotionHooksProvider} from '../CanUseRemotionHooks.js';
import {Freeze} from '../freeze.js';
import type {TimelineContextValue} from '../internals.js';
import {Internals} from '../internals.js';
import {Sequence} from '../Sequence.js';
import {useVideoConfig} from '../use-video-config.js';
import {WrapSequenceContext} from './wrap-sequence-context.js';

const Inner: React.FC = () => {
	const config = useVideoConfig();

	return <div>{config.durationInFrames}</div>;
};

const context: TimelineContextValue = {
	audioAndVideoTags: {current: []},
	frame: 10000,
	imperativePlaying: {
		current: false,
	},
	playbackRate: 0,
	playing: false,
	rootId: 'hither',
	setPlaybackRate: () => undefined,
};

describe('Composition-validation render should NOT throw with valid props', () => {
	test('It should allow undefined as children', () => {
		const {queryByText} = render(
			<CanUseRemotionHooksProvider>
				<WrapSequenceContext>
					<Internals.Timeline.TimelineContext.Provider value={context}>
						<Freeze frame={10000}>
							<Sequence durationInFrames={2424} from={9265}>
								<Inner />
							</Sequence>
						</Freeze>
					</Internals.Timeline.TimelineContext.Provider>
				</WrapSequenceContext>
			</CanUseRemotionHooksProvider>
		);

		expect(queryByText(/^0$/)).not.toBe(null);
	});
});
