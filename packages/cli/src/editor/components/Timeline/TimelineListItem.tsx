import React, {useCallback, useMemo} from 'react';
import type {TSequence} from 'remotion';
import {
	TIMELINE_BORDER,
	TIMELINE_LAYER_HEIGHT,
	TIMELINE_PADDING,
} from '../../helpers/timeline-layout';
import {useZIndex} from '../../state/z-index';
import {Spacing} from '../layout';
import type {TimelineActionState} from './timeline-state-reducer';
import {TimelineCollapseToggle} from './TimelineCollapseToggle';
import {TimelineSequenceFrame} from './TimelineSequenceFrame';

const HOOK_WIDTH = 7;
const BORDER_BOTTOM_LEFT_RADIUS = 2;
const SPACING = 5;

const TIMELINE_LAYER_PADDING = HOOK_WIDTH + SPACING * 1.5;
const TIMELINE_COLLAPSER_WIDTH = 8;
const TIMELINE_COLLAPSER_MARGIN_RIGHT = 10;

export const TOTAL_TIMELINE_LAYER_LEFT_PADDING =
	TIMELINE_COLLAPSER_WIDTH + TIMELINE_COLLAPSER_MARGIN_RIGHT + TIMELINE_PADDING;

const textStyle: React.CSSProperties = {
	fontSize: 13,
	whiteSpace: 'nowrap',
	textOverflow: 'ellipsis',
	overflow: 'hidden',
};

const outer: React.CSSProperties = {
	height: TIMELINE_LAYER_HEIGHT + TIMELINE_BORDER * 2,
	color: 'white',
	fontFamily: 'Arial, Helvetica, sans-serif',
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	paddingLeft: TIMELINE_PADDING,
	wordBreak: 'break-all',
	textAlign: 'left',
};

const hookContainer: React.CSSProperties = {
	height: TIMELINE_LAYER_HEIGHT,
	width: HOOK_WIDTH,
	position: 'relative',
};

const hook: React.CSSProperties = {
	borderLeft: '1px solid #555',
	borderBottom: '1px solid #555',
	borderBottomLeftRadius: BORDER_BOTTOM_LEFT_RADIUS,
	width: HOOK_WIDTH,
	position: 'absolute',
	bottom: TIMELINE_LAYER_HEIGHT / 2 - 1,
};

const space: React.CSSProperties = {
	width: SPACING,
	flexShrink: 0,
};

const smallSpace: React.CSSProperties = {
	width: SPACING * 0.5,

	flexShrink: 0,
};

const collapser: React.CSSProperties = {
	width: TIMELINE_COLLAPSER_WIDTH,
	userSelect: 'none',
	marginRight: TIMELINE_COLLAPSER_MARGIN_RIGHT,
	flexShrink: 0,
};

const collapserButton: React.CSSProperties = {
	...collapser,
	border: 'none',
	background: 'none',
};

export const TimelineListItem: React.FC<{
	sequence: TSequence;
	nestedDepth: number;
	beforeDepth: number;
	collapsed: boolean;
	dispatchStateChange: React.Dispatch<TimelineActionState>;
	hash: string;
	canCollapse: boolean;
}> = ({
	nestedDepth,
	sequence,
	collapsed,
	beforeDepth,
	dispatchStateChange,
	hash,
	canCollapse,
}) => {
	const {tabIndex} = useZIndex();
	const leftOffset = TIMELINE_LAYER_PADDING;
	const hookStyle = useMemo(() => {
		return {
			...hook,
			height:
				TIMELINE_LAYER_HEIGHT +
				BORDER_BOTTOM_LEFT_RADIUS / 2 -
				(beforeDepth === nestedDepth ? 2 : 12),
		};
	}, [beforeDepth, nestedDepth]);

	const padder = useMemo((): React.CSSProperties => {
		return {
			width: leftOffset * nestedDepth,
			flexShrink: 0,
		};
	}, [leftOffset, nestedDepth]);

	const toggleCollapse = useCallback(() => {
		if (collapsed) {
			dispatchStateChange({
				type: 'expand',
				hash,
			});
		} else {
			dispatchStateChange({
				type: 'collapse',
				hash,
			});
		}
	}, [collapsed, dispatchStateChange, hash]);
	const text =
		sequence.displayName.length > 80
			? sequence.displayName.slice(0, 80) + '...'
			: sequence.displayName;

	return (
		<div style={outer}>
			<div style={padder} />
			{canCollapse ? (
				<button
					tabIndex={tabIndex}
					type="button"
					style={collapserButton}
					onClick={toggleCollapse}
				>
					<TimelineCollapseToggle collapsed={collapsed} />
				</button>
			) : (
				<div style={collapser} />
			)}
			{sequence.parent && nestedDepth > 0 ? (
				<>
					<div style={smallSpace} />
					<div style={hookContainer}>
						<div style={hookStyle} />
					</div>
					<div style={space} />
				</>
			) : null}
			<div title={text || 'Untitled'} style={textStyle}>
				{text || 'Untitled'}
				<TimelineSequenceFrame
					duration={sequence.duration}
					from={sequence.from}
				/>
			</div>
			<Spacing x={1} />
		</div>
	);
};
