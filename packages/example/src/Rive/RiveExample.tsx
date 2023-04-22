import {RemotionRiveCanvas} from '@remotion/rive';
import {AbsoluteFill, useVideoConfig} from 'remotion';

const RiveVehicle = () => {
	const {height, width} = useVideoConfig();

	return (
		<AbsoluteFill style={{height, width}}>
			<RemotionRiveCanvas src="https://cdn.rive.app/animations/vehicles.riv" />
		</AbsoluteFill>
	);
};

export default RiveVehicle;
