import {Upload} from '@aws-sdk/lib-storage';
import type {Dirent} from 'fs';
import {createReadStream, promises as fs} from 'fs';
import mimeTypes from 'mime-types';
import path from 'path';
import type {Privacy} from '../defaults';
import type {AwsRegion} from '../pricing/aws-regions';
import {getS3Client} from '../shared/aws-clients';
import {makeS3Key} from '../shared/make-s3-key';

type FileInfo = {
	name: string;
	size: number;
};

export type UploadDirProgress = {
	totalFiles: number;
	filesUploaded: number;
	totalSize: number;
	sizeUploaded: number;
};

export type MockFile = {
	name: string;
	content: string;
};

export const getDirFiles = (entry: string): MockFile[] => {
	throw new TypeError(
		'should only be executed in test ' + JSON.stringify(entry)
	);
};

async function getFiles(
	directory: string,
	originalDirectory: string,
	toUpload: string[]
): Promise<FileInfo[]> {
	const dirents = await fs.readdir(directory, {withFileTypes: true});
	const _files = await Promise.all(
		dirents
			.map((dirent): [Dirent, string] => {
				const res = path.resolve(directory, dirent.name);
				return [dirent, res];
			})
			.filter(([dirent, res]) => {
				const relative = path.relative(originalDirectory, res);
				if (dirent.isDirectory()) {
					return true;
				}

				if (!toUpload.includes(relative)) {
					return false;
				}

				return true;
			})
			.map(async ([dirent, res]) => {
				const {size} = await fs.stat(res);
				return dirent.isDirectory()
					? getFiles(res, originalDirectory, toUpload)
					: [
							{
								name: res,
								size,
							},
					  ];
			})
	);
	return _files.flat(1);
}

export const uploadDir = async ({
	bucket,
	region,
	localDir,
	onProgress,
	keyPrefix,
	privacy,
	toUpload,
}: {
	bucket: string;
	region: AwsRegion;
	localDir: string;
	keyPrefix: string;
	onProgress: (progress: UploadDirProgress) => void;
	privacy: Privacy;
	toUpload: string[];
}) => {
	const files = await getFiles(localDir, localDir, toUpload);
	const progresses: {[key: string]: number} = {};
	for (const file of files) {
		progresses[file.name] = 0;
	}

	const client = getS3Client(region, null);

	const uploads = files.map((filePath) => {
		const Key = makeS3Key(keyPrefix, localDir, filePath.name);
		const Body = createReadStream(filePath.name);
		const ContentType = mimeTypes.lookup(Key) || 'application/octet-stream';
		const ACL =
			privacy === 'no-acl'
				? undefined
				: privacy === 'private'
				? 'private'
				: 'public-read';
		const paralellUploads3 = new Upload({
			client,
			queueSize: 4,
			partSize: 5 * 1024 * 1024,
			params: {
				Key,
				Bucket: bucket,
				Body,
				ACL,
				ContentType,
			},
		});
		paralellUploads3.on('httpUploadProgress', (progress) => {
			progresses[filePath.name] = progress.loaded ?? 0;
		});
		return paralellUploads3.done();
	});
	const promise = Promise.all(uploads);

	const interval = setInterval(() => {
		onProgress({
			totalSize: files.map((f) => f.size).reduce((a, b) => a + b, 0),
			sizeUploaded: Object.values(progresses).reduce((a, b) => a + b, 0),
			totalFiles: files.length,
			filesUploaded: files.filter((f) => progresses[f.name] === f.size).length,
		});
	}, 1000);
	await promise;
	clearInterval(interval);
};
