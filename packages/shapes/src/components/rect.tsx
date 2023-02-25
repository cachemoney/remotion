import React from 'react';
import type {MakeRectOptions} from '../utils/make-rect';
import {makeRect} from '../utils/make-rect';
import type {AllShapesProps} from './render-svg';
import {RenderSvg} from './render-svg';

export type RectProps = MakeRectOptions & AllShapesProps;

export const Rect: React.FC<RectProps> = ({
	width,
	edgeRoundness,
	height,
	cornerRadius,
	...props
}) => {
	return (
		<RenderSvg
			{...makeRect({height, width, edgeRoundness, cornerRadius})}
			{...props}
		/>
	);
};
