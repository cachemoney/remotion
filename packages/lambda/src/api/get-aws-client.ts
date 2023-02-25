import * as CloudWatchSDK from '@aws-sdk/client-cloudwatch-logs';
import * as IamSdk from '@aws-sdk/client-iam';
import * as LambdaSDK from '@aws-sdk/client-lambda';
import * as S3SDK from '@aws-sdk/client-s3';
import * as ServiceQuotasSDK from '@aws-sdk/client-service-quotas';
import * as StsSdk from '@aws-sdk/client-sts';
import type {AwsRegion} from '../client';
import type {CustomCredentials, ServiceMapping} from '../shared/aws-clients';
import {getServiceClient} from '../shared/aws-clients';

export type GetAwsClientInput<T extends keyof ServiceMapping> = {
	region: AwsRegion;
	service: T;
	customCredentials?: CustomCredentials | null;
};

type SdkMapping = {
	s3: typeof S3SDK;
	cloudwatch: typeof CloudWatchSDK;
	iam: typeof IamSdk;
	lambda: typeof LambdaSDK;
	servicequotas: typeof ServiceQuotasSDK;
	sts: typeof StsSdk;
};

export type GetAwsClientOutput<T extends keyof ServiceMapping> = {
	client: ServiceMapping[T];
	sdk: SdkMapping[T];
};

/**
 * @description Gets the full AWS SDK and an instantiated client for an AWS service
 * @link https://remotion.dev/docs/lambda/getawsclient
 * @param {AwsRegion} params.region The region in which the S3 bucket resides in.
 * @param {string} params.service One of `iam`, `s3`, `cloudwatch`, `iam` or `servicequotas`
 * @param {CustomCredentials} params.customCredentials Pass endpoint and credentials if you want to connect to a different cloud for S3
 * @returns {GetAwsClientOutput<T>} Returns `client` and `sdk` of a AWS service
 */
export const getAwsClient = <T extends keyof ServiceMapping>({
	region,
	service,
	customCredentials,
}: GetAwsClientInput<T>): GetAwsClientOutput<T> => {
	return {
		client: getServiceClient({
			region,
			service,
			customCredentials: customCredentials ?? null,
		}),
		sdk: {
			lambda: LambdaSDK,
			cloudwatch: CloudWatchSDK,
			iam: IamSdk,
			s3: S3SDK,
			servicequotas: ServiceQuotasSDK,
			sts: StsSdk,
		}[service],
	};
};
