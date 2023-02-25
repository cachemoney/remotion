import fs from 'fs';
import path from 'path';

export async function copyDir({
	src,
	dest,
	onSymlinkDetected,
	onProgress,
}: {
	src: string;
	dest: string;
	onSymlinkDetected: (entry: fs.Dirent, dir: string) => void;
	onProgress: (bytes: number) => void;
}) {
	await fs.promises.mkdir(dest, {recursive: true});
	const entries = await fs.promises.readdir(src, {withFileTypes: true});

	let copied = 0;

	for (const entry of entries) {
		const srcPath = path.join(src, entry.name);
		const destPath = path.join(dest, entry.name);

		if (entry.isDirectory()) {
			await copyDir({
				src: srcPath,
				dest: destPath,
				onSymlinkDetected,
				onProgress,
			});
		} else if (entry.isSymbolicLink()) {
			const realpath = await fs.promises.realpath(srcPath);
			onSymlinkDetected(entry, src);
			await fs.promises.symlink(realpath, destPath);
		} else {
			const [, {size}] = await Promise.all([
				fs.promises.copyFile(srcPath, destPath),
				fs.promises.stat(srcPath),
			]);
			copied += size;
			onProgress(copied);
		}
	}
}
