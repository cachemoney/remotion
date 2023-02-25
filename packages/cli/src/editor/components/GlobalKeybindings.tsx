import type React from 'react';
import {useContext, useEffect} from 'react';
import {useKeybinding} from '../helpers/use-keybinding';
import {CheckerboardContext} from '../state/checkerboard';
import {ModalsContext} from '../state/modals';

export const GlobalKeybindings: React.FC = () => {
	const keybindings = useKeybinding();
	const {setSelectedModal} = useContext(ModalsContext);
	const {setCheckerboard} = useContext(CheckerboardContext);

	useEffect(() => {
		const nKey = keybindings.registerKeybinding({
			event: 'keypress',
			key: 'n',
			callback: () => {
				setSelectedModal({
					type: 'new-comp',
					compType: 'composition',
				});
			},
			commandCtrlKey: false,
			preventDefault: true,
		});
		const cmdKKey = keybindings.registerKeybinding({
			event: 'keydown',
			key: 'k',
			callback: () => {
				setSelectedModal({
					type: 'quick-switcher',
					mode: 'compositions',
					invocationTimestamp: Date.now(),
				});
			},

			commandCtrlKey: true,
			preventDefault: true,
		});

		const cKey = keybindings.registerKeybinding({
			event: 'keypress',
			key: 't',
			callback: () => {
				setCheckerboard((c) => !c);
			},
			commandCtrlKey: true,
			preventDefault: true,
		});
		const questionMark = keybindings.registerKeybinding({
			event: 'keypress',
			key: '?',
			callback: () => {
				setSelectedModal({
					type: 'quick-switcher',
					mode: 'docs',
					invocationTimestamp: Date.now(),
				});
			},
			commandCtrlKey: false,
			preventDefault: true,
		});

		return () => {
			nKey.unregister();
			cKey.unregister();
			questionMark.unregister();
			cmdKKey.unregister();
		};
	}, [keybindings, setCheckerboard, setSelectedModal]);

	return null;
};
