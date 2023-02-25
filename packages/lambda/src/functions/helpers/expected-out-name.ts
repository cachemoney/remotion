import type {Codec} from '@remotion/renderer';
import {RenderInternals} from '@remotion/renderer';
import type {OutNameInput, OutNameOutput, RenderMetadata} from '../../defaults';
import {customOutName, outName, outStillName} from '../../defaults';
import type {CustomCredentials} from '../../shared/aws-clients';
import {validateOutname} from '../../shared/validate-outname';
import {getCustomOutName} from './get-custom-out-name';

export const getCredentialsFromOutName = (
	name: OutNameInput | null
): CustomCredentials | null => {
	if (typeof name === 'string') {
		return null;
	}

	if (name === null) {
		return null;
	}

	if (typeof name === 'undefined') {
		return null;
	}

	return name.s3OutputProvider ?? null;
};

export const getExpectedOutName = (
	renderMetadata: RenderMetadata,
	bucketName: string,
	customCredentials: CustomCredentials | null
): OutNameOutput => {
	const outNameValue = getCustomOutName({
		customCredentials,
		renderMetadata,
	});
	if (outNameValue) {
		validateOutname(
			outNameValue,
			renderMetadata.codec,
			renderMetadata.audioCodec
		);
		return customOutName(renderMetadata.renderId, bucketName, outNameValue);
	}

	if (renderMetadata.type === 'still') {
		return {
			renderBucketName: bucketName,
			key: outStillName(renderMetadata.renderId, renderMetadata.imageFormat),
			customCredentials: null,
		};
	}

	if (renderMetadata.type === 'video') {
		return {
			renderBucketName: bucketName,
			key: outName(
				renderMetadata.renderId,
				RenderInternals.getFileExtensionFromCodec(
					renderMetadata.codec as Codec,
					renderMetadata.audioCodec
				)
			),
			customCredentials: null,
		};
	}

	throw new TypeError('no type passed');
};
