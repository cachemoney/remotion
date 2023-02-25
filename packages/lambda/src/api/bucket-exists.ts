import {GetBucketLocationCommand} from '@aws-sdk/client-s3';
import type {AwsRegion} from '../pricing/aws-regions';
import {getS3Client} from '../shared/aws-clients';

export const bucketExistsInRegion = async ({
	bucketName,
	region,
	expectedBucketOwner,
}: {
	bucketName: string;
	region: AwsRegion;
	expectedBucketOwner: string | null;
}) => {
	try {
		const bucket = await getS3Client(region, null).send(
			new GetBucketLocationCommand({
				Bucket: bucketName,
				ExpectedBucketOwner: expectedBucketOwner ?? undefined,
			})
		);

		return (bucket.LocationConstraint ?? 'us-east-1') === region;
	} catch (err) {
		if ((err as {Code: string}).Code === 'NoSuchBucket') {
			return false;
		}

		throw err;
	}
};
