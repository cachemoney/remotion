import React from 'react';
import type {MakeStarProps} from '../utils/make-star';
import {makeStar} from '../utils/make-star';
import type {AllShapesProps} from './render-svg';
import {RenderSvg} from './render-svg';

export type StarProps = MakeStarProps & Omit<AllShapesProps, 'points'>;

export const Star: React.FC<StarProps> = ({
	innerRadius,
	outerRadius,
	points,
	cornerRadius,
	edgeRoundness,
	...props
}) => {
	return (
		<RenderSvg
			{...makeStar({
				innerRadius,
				outerRadius,
				points,
				cornerRadius,
				edgeRoundness,
			})}
			{...props}
		/>
	);
};
