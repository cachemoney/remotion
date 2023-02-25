import {VERSION} from 'remotion/version';
import {expect, test} from 'vitest';
import {LambdaRoutines} from '../../defaults';
import {handler} from '../../functions/index';

test('Call function locally', async () => {
	expect(
		await handler(
			{type: LambdaRoutines.info},
			{
				invokedFunctionArn: 'arn',
				getRemainingTimeInMillis: () => 1000,
			}
		)
	).toEqual({version: VERSION});
});
