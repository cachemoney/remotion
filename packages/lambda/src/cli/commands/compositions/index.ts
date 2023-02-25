import {CliInternals} from '@remotion/cli';
import {getCompositionsOnLambda} from '../../..';
import {BINARY_NAME} from '../../../shared/constants';
import {validateServeUrl} from '../../../shared/validate-serveurl';
import {parsedLambdaCli} from '../../args';
import {getAwsRegion} from '../../get-aws-region';
import {findFunctionName} from '../../helpers/find-function-name';
import {quit} from '../../helpers/quit';
import {Log} from '../../log';

export const COMPOSITIONS_COMMAND = 'compositions';

export const compositionsCommand = async (
	args: string[],
	remotionRoot: string
) => {
	const serveUrl = args[0];

	if (!serveUrl) {
		Log.error('No serve URL passed.');
		Log.info(
			'Pass an additional argument specifying a URL where your Remotion project is hosted.'
		);
		Log.info();
		Log.info(`${BINARY_NAME} ${COMPOSITIONS_COMMAND} <serve-url>`);
		quit(1);
	}

	const {
		chromiumOptions,
		envVariables,
		inputProps,
		logLevel,
		puppeteerTimeout,
	} = await CliInternals.getCliOptions({
		type: 'get-compositions',
		isLambda: true,
		remotionRoot,
	});

	const region = getAwsRegion();
	validateServeUrl(serveUrl);
	const functionName = await findFunctionName();

	const comps = await getCompositionsOnLambda({
		functionName,
		serveUrl,
		inputProps,
		region,
		chromiumOptions,
		envVariables,
		logLevel,
		timeoutInMilliseconds: puppeteerTimeout,
		forceBucketName: parsedLambdaCli['force-bucket-name'],
	});

	CliInternals.printCompositions(comps);
};
