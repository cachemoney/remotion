import fs from 'fs';
import {tmpdir} from 'os';
import {expect, test} from 'vitest';
import {getSanitizedFilenameForAssetUrl} from '../assets/download-and-map-assets-to-file';
import {downloadFile} from '../assets/download-file';

test('Should be able to download file', async () => {
	const downloadDir = tmpdir();
	const {to} = await downloadFile({
		url: 'https://remotion.dev/',
		to: (contentDisposition, contentType) => {
			return getSanitizedFilenameForAssetUrl({
				contentDisposition,
				downloadDir,
				src: 'https://remotion.dev/',
				contentType,
			});
		},
		onProgress: () => undefined,
	});
	const data = await fs.promises.readFile(to, 'utf8');

	expect(data).toMatch(/<!doctype/);
});

test('Should fail to download invalid files', async () => {
	const downloadDir = tmpdir();
	await expect(() =>
		downloadFile({
			to: (contentDisposition, contentType) => {
				return getSanitizedFilenameForAssetUrl({
					contentDisposition,
					contentType,
					downloadDir,
					src: 'https://thisdomain.doesnotexist',
				});
			},
			url: 'https://thisdomain.doesnotexist',
			onProgress: () => undefined,
		})
	).rejects.toThrow(/ENOTFOUND/);
});
