import type {DeleteFunctionInput} from './api/delete-function';
import {deleteFunction} from './api/delete-function';
import type {DeleteRenderInput} from './api/delete-render';
import {deleteRender} from './api/delete-render';
import type {DeleteSiteInput, DeleteSiteOutput} from './api/delete-site';
import {deleteSite} from './api/delete-site';
import type {
	DeployFunctionInput,
	DeployFunctionOutput,
} from './api/deploy-function';
import {deployFunction} from './api/deploy-function';
import type {DeploySiteInput, DeploySiteOutput} from './api/deploy-site';
import {deploySite} from './api/deploy-site';
import type {
	DownloadMediaInput,
	DownloadMediaOutput,
} from './api/download-media';
import {downloadMedia, downloadVideo} from './api/download-media';
import type {EstimatePriceInput} from './api/estimate-price';
import {estimatePrice} from './api/estimate-price';
import type {GetAwsClientInput, GetAwsClientOutput} from './api/get-aws-client';
import {getAwsClient} from './api/get-aws-client';
import type {
	GetCompositionsOnLambdaInput,
	GetCompositionsOnLambdaOutput,
} from './api/get-compositions-on-lambda';
import {getCompositionsOnLambda} from './api/get-compositions-on-lambda';
import type {FunctionInfo, GetFunctionInfoInput} from './api/get-function-info';
import {getFunctionInfo} from './api/get-function-info';
import type {GetFunctionsInput} from './api/get-functions';
import {getFunctions} from './api/get-functions';
import type {
	GetOrCreateBucketInput,
	GetOrCreateBucketOutput,
} from './api/get-or-create-bucket';
import {getOrCreateBucket} from './api/get-or-create-bucket';
import {getRegions} from './api/get-regions';
import type {GetRenderInput} from './api/get-render-progress';
import {getRenderProgress} from './api/get-render-progress';
import type {GetSitesInput, GetSitesOutput} from './api/get-sites';
import {getSites as deprecatedGetSites} from './api/get-sites';
import type {
	SimulatePermissionsInput,
	SimulatePermissionsOutput,
} from './api/iam-validation/simulate';
import {simulatePermissions} from './api/iam-validation/simulate';
import {
	getRolePolicy,
	getUserPolicy,
} from './api/iam-validation/suggested-policy';
import {presignUrl as deprecatedPresignUrl} from './api/presign-url';
import type {
	RenderMediaOnLambdaInput,
	RenderMediaOnLambdaOutput,
} from './api/render-media-on-lambda';
import {
	renderMediaOnLambda as deprecatedRenderMediaOnLambda,
	renderVideoOnLambda,
} from './api/render-media-on-lambda';
import type {
	RenderStillOnLambdaInput,
	RenderStillOnLambdaOutput,
} from './api/render-still-on-lambda';
import {renderStillOnLambda as deprecatedRenderStillOnLambda} from './api/render-still-on-lambda';
import {validateWebhookSignature} from './api/validate-webhook-signature';
import type {LambdaLSInput, LambdaLsReturnType} from './functions/helpers/io';
import type {
	EnhancedErrorInfo,
	LambdaErrorInfo,
} from './functions/helpers/write-lambda-error';
import {LambdaInternals} from './internals';
import type {AwsRegion} from './pricing/aws-regions';
import type {CustomCredentials} from './shared/aws-clients';
import type {RenderProgress} from './shared/constants';
import type {WebhookPayload} from './shared/invoke-webhook';
import type {LambdaArchitecture} from './shared/validate-architecture';

/**
 * @deprecated Import this from `@remotion/lambda/client` instead
 */
const renderMediaOnLambda = deprecatedRenderMediaOnLambda;

/**
 * @deprecated Import this from `@remotion/lambda/client` instead
 */
const renderStillOnLambda = deprecatedRenderStillOnLambda;

/**
 * @deprecated Import this from `@remotion/lambda/client` instead
 */
const presignUrl = deprecatedPresignUrl;

/**
 * @deprecated Import this from `@remotion/lambda/client` instead
 */
const getSites = deprecatedGetSites;

export {
	deleteSite,
	deployFunction,
	deploySite,
	downloadMedia,
	downloadVideo,
	getFunctions,
	getUserPolicy,
	getRolePolicy,
	getSites,
	getOrCreateBucket,
	getRenderProgress,
	renderVideoOnLambda,
	renderMediaOnLambda,
	simulatePermissions,
	deleteFunction,
	getFunctionInfo,
	estimatePrice,
	LambdaInternals,
	renderStillOnLambda,
	getRegions,
	getAwsClient,
	presignUrl,
	deleteRender,
	validateWebhookSignature,
	getCompositionsOnLambda,
};
export type {
	AwsRegion,
	RenderProgress,
	DeploySiteInput,
	DeploySiteOutput,
	LambdaLsReturnType,
	LambdaLSInput,
	DeleteSiteInput,
	DeleteSiteOutput,
	EstimatePriceInput,
	DeployFunctionInput,
	DeployFunctionOutput,
	DeleteFunctionInput,
	GetFunctionInfoInput,
	FunctionInfo,
	GetFunctionsInput,
	GetSitesInput,
	GetSitesOutput,
	DownloadMediaInput,
	DownloadMediaOutput,
	GetOrCreateBucketInput,
	GetOrCreateBucketOutput,
	GetRenderInput,
	RenderMediaOnLambdaInput,
	RenderMediaOnLambdaOutput,
	RenderStillOnLambdaInput,
	RenderStillOnLambdaOutput,
	SimulatePermissionsInput,
	SimulatePermissionsOutput,
	GetAwsClientInput,
	GetAwsClientOutput,
	LambdaArchitecture,
	CustomCredentials,
	WebhookPayload,
	LambdaErrorInfo,
	EnhancedErrorInfo,
	DeleteRenderInput,
	GetCompositionsOnLambdaOutput,
	GetCompositionsOnLambdaInput,
};
