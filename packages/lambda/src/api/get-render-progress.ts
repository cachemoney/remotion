import {VERSION} from 'remotion/version';
import type {AwsRegion} from '../pricing/aws-regions';
import type {CustomCredentials} from '../shared/aws-clients';
import {callLambda} from '../shared/call-lambda';
import type {RenderProgress} from '../shared/constants';
import {LambdaRoutines} from '../shared/constants';

export type GetRenderInput = {
	functionName: string;
	bucketName: string;
	renderId: string;
	region: AwsRegion;
	s3OutputProvider?: CustomCredentials;
};

/**
 * @description Gets the current status of a render originally triggered via renderMediaOnLambda().
 * @link https://remotion.dev/docs/lambda/getrenderprogress
 * @param {string} params.functionName The name of the function used to trigger the render.
 * @param {string} params.bucketName The name of the bucket that was used in the render.
 * @param {string} params.renderId The ID of the render that was returned by `renderMediaOnLambda()`.
 * @param {AwsRegion} params.region The region in which the render was triggered.
 * @param {CustomCredentials} params.s3OutputProvider? Endpoint and credentials if the output file is stored outside of AWS.
 * @returns {Promise<RenderProgress>} See documentation for this function to see all properties on the return object.
 */
export const getRenderProgress = async ({
	functionName,
	bucketName,
	renderId,
	region,
	s3OutputProvider,
}: GetRenderInput): Promise<RenderProgress> => {
	const result = await callLambda({
		functionName,
		type: LambdaRoutines.status,
		payload: {
			bucketName,
			renderId,
			version: VERSION,
			s3OutputProvider,
		},
		region,
	});
	return result;
};
