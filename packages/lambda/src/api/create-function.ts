import {
	CreateLogGroupCommand,
	PutRetentionPolicyCommand,
} from '@aws-sdk/client-cloudwatch-logs';
import {
	CreateFunctionCommand,
	GetFunctionCommand,
	PutFunctionEventInvokeConfigCommand,
	PutRuntimeManagementConfigCommand,
} from '@aws-sdk/client-lambda';
import {readFileSync} from 'fs';
import {LOG_GROUP_PREFIX} from '../defaults';
import type {AwsRegion} from '../pricing/aws-regions';
import {getCloudWatchLogsClient, getLambdaClient} from '../shared/aws-clients';
import {__internal_doNotUsehostedLayers} from '../shared/hosted-layers';
import type {LambdaArchitecture} from '../shared/validate-architecture';
import {ROLE_NAME} from './iam-validation/suggested-policy';

export const createFunction = async ({
	createCloudWatchLogGroup,
	region,
	zipFile,
	functionName,
	accountId,
	memorySizeInMb,
	timeoutInSeconds,
	alreadyCreated,
	retentionInDays,
	architecture,
	ephemerealStorageInMb,
	customRoleArn,
}: {
	createCloudWatchLogGroup: boolean;
	region: AwsRegion;
	zipFile: string;
	functionName: string;
	accountId: string;
	memorySizeInMb: number;
	timeoutInSeconds: number;
	alreadyCreated: boolean;
	retentionInDays: number;
	ephemerealStorageInMb: number;
	architecture: LambdaArchitecture;
	customRoleArn: string;
}): Promise<{FunctionName: string}> => {
	if (createCloudWatchLogGroup) {
		try {
			await getCloudWatchLogsClient(region).send(
				new CreateLogGroupCommand({
					logGroupName: `${LOG_GROUP_PREFIX}${functionName}`,
				})
			);
		} catch (_err) {
			const err = _err as Error;
			if (!err.message.includes('log group already exists')) {
				throw err;
			}
		}

		await getCloudWatchLogsClient(region).send(
			new PutRetentionPolicyCommand({
				logGroupName: `${LOG_GROUP_PREFIX}${functionName}`,
				retentionInDays,
			})
		);
	}

	if (alreadyCreated) {
		return {FunctionName: functionName};
	}

	const defaultRoleName = `arn:aws:iam::${accountId}:role/${ROLE_NAME}`;

	const {FunctionName} = await getLambdaClient(region).send(
		new CreateFunctionCommand({
			Code: {
				ZipFile: readFileSync(zipFile),
			},
			FunctionName: functionName,
			Handler: 'index.handler',
			Role: customRoleArn ?? defaultRoleName,
			Description: 'Renders a Remotion video.',
			MemorySize: memorySizeInMb,
			Timeout: timeoutInSeconds,
			Layers: __internal_doNotUsehostedLayers[architecture][region].map(
				({layerArn, version}) => `${layerArn}:${version}`
			),
			Architectures: [architecture],
			EphemeralStorage: {
				Size: ephemerealStorageInMb,
			},
			Runtime: 'nodejs14.x',
		})
	);
	await getLambdaClient(region).send(
		new PutFunctionEventInvokeConfigCommand({
			MaximumRetryAttempts: 0,
			FunctionName,
		})
	);

	let state = 'Pending';

	while (state === 'Pending') {
		const getFn = await getLambdaClient(region).send(
			new GetFunctionCommand({
				FunctionName,
			})
		);
		await new Promise<void>((resolve) => {
			setTimeout(() => resolve(), 1000);
		});
		state = getFn.Configuration?.State as string;
	}

	try {
		await getLambdaClient(region).send(
			new PutRuntimeManagementConfigCommand({
				FunctionName,
				UpdateRuntimeOn: 'Manual',
				RuntimeVersionArn: `arn:aws:lambda:${region}::runtime:69000d3430a08938bcab71617dffcb8ea551a2cbc36c59f38c52a1ea087e461b`,
			})
		);
	} catch (err) {
		console.warn(
			'⚠️ Could not lock the runtime version. We recommend to update your policies to prevent your functions from breaking soon: https://remotion.dev/docs/lambda/feb-2023-incident'
		);
	}

	return {FunctionName: FunctionName as string};
};
