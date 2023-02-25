import fs from 'fs';
import os from 'os';
import path from 'path';
import {Log} from './log';
import {parsedCli} from './parse-command-line';

/**
 * @description You can retrieve inputs that you pass in, from the command line using --props, or the inputProps parameter if you're using the Node.js API
 * @see [Documentation](https://www.remotion.dev/docs/get-input-props)
 */
export const getInputProps = (onUpdate: (newProps: object) => void): object => {
	if (!parsedCli.props) {
		return {};
	}

	const jsonFile = path.resolve(process.cwd(), parsedCli.props);
	try {
		if (fs.existsSync(jsonFile)) {
			const rawJsonData = fs.readFileSync(jsonFile, 'utf-8');

			fs.watchFile(jsonFile, {interval: 100}, () => {
				try {
					onUpdate(JSON.parse(fs.readFileSync(jsonFile, 'utf-8')));
					Log.info(`Updated input props from ${jsonFile}.`);
				} catch (err) {
					Log.error(
						`${jsonFile} contains invalid JSON. Did not apply new input props.`
					);
				}
			});
			return JSON.parse(rawJsonData);
		}

		return JSON.parse(parsedCli.props);
	} catch (err) {
		Log.error(
			'You passed --props but it was neither valid JSON nor a file path to a valid JSON file.'
		);
		Log.info('Got the following value:', parsedCli.props);
		Log.error(
			'Check that your input is parseable using `JSON.parse` and try again.'
		);
		if (os.platform() === 'win32') {
			Log.warn(
				'Note: Windows handles escaping of quotes very weirdly in the command line.'
			);
			Log.warn('This might have led to you having this problem.');
			Log.warn(
				'Consider using the alternative API for --props which is to pass'
			);
			Log.warn('a path to a JSON file:');
			Log.warn('  --props=path/to/props.json');
		}

		process.exit(1);
	}
};
