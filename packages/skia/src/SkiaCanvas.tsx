import type {CanvasProps} from '@shopify/react-native-skia';
import {Canvas} from '@shopify/react-native-skia';
import type {ReactNode} from 'react';
import {useMemo} from 'react';
import {Internals} from 'remotion';

type RemotionCanvasProps = CanvasProps & {
	children: ReactNode;
	width: number;
	height: number;
};

/**
 * @description A React Native Skia <Canvas /> component that wraps Remotion contexts.
 * @see [Documentation](https://www.remotion.dev/docs/skia/skia-canvas)
 */
export const SkiaCanvas = ({
	children,
	height,
	width,
	style,
	...otherProps
}: RemotionCanvasProps) => {
	const contexts = Internals.useRemotionContexts();

	const props: Omit<CanvasProps, 'children'> = useMemo(() => {
		return {
			style: [
				{
					width,
					height,
				},
				style,
			],
			...otherProps,
		};
	}, [height, otherProps, style, width]);

	return (
		<Canvas {...props}>
			<Internals.RemotionContextProvider contexts={contexts}>
				{children}
			</Internals.RemotionContextProvider>
		</Canvas>
	);
};
