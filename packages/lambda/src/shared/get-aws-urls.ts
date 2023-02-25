import type {AwsRegion} from '../client';
import type {LambdaRoutines} from './constants';

export const getCloudwatchStreamUrl = ({
	region,
	functionName,
	method,
	renderId,
	rendererFunctionName,
}: {
	region: AwsRegion;
	functionName: string;
	rendererFunctionName: string | null;
	method: LambdaRoutines;
	renderId: string;
}) => {
	const functionNameToUse = rendererFunctionName ?? functionName;
	return `https://${region}.console.aws.amazon.com/cloudwatch/home?region=${region}#logsV2:log-groups/log-group/$252Faws$252Flambda$252F${functionNameToUse}/log-events$3FfilterPattern$3D$2522method$253D${method}$252CrenderId$253D${renderId}$2522`;
};

export const getS3RenderUrl = ({
	renderId,
	region,
	bucketName,
}: {
	renderId: string;
	region: AwsRegion;
	bucketName: string;
}) => {
	return `https://s3.console.aws.amazon.com/s3/buckets/${bucketName}?region=${region}&prefix=renders/${renderId}/`;
};
