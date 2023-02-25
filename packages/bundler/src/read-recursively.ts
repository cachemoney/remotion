import fs, {statSync} from 'fs';
import path from 'path';
import type {StaticFile} from 'remotion';

export const readRecursively = ({
	folder,
	output = [],
	startPath,
	staticHash,
	limit,
}: {
	folder: string;
	startPath: string;
	output?: StaticFile[];
	staticHash: string;
	limit: number;
}): StaticFile[] => {
	const absFolder = path.join(startPath, folder);

	if (!fs.existsSync(absFolder)) {
		return [];
	}

	const files = fs.readdirSync(absFolder);

	for (const file of files) {
		if (output.length >= limit) {
			break;
		}

		if (file.startsWith('.DS_Store')) {
			continue;
		}

		const stat = statSync(path.join(absFolder, file));
		if (stat.isDirectory()) {
			readRecursively({
				startPath,
				folder: path.join(folder, file),
				output,
				staticHash,
				limit,
			});
		} else if (stat.isFile()) {
			output.push({
				name: path.join(folder, file),
				lastModified: Math.floor(stat.mtimeMs),
				sizeInBytes: stat.size,
				src: staticHash + '/' + path.join(folder, file),
			});
		} else if (stat.isSymbolicLink()) {
			const realpath = fs.realpathSync(path.join(folder, file));
			const realStat = fs.statSync(realpath);
			if (realStat.isFile()) {
				output.push({
					name: realpath,
					lastModified: Math.floor(realStat.mtimeMs),
					sizeInBytes: realStat.size,
					src: staticHash + '/' + realpath,
				});
			}
		}
	}

	return output.sort((a, b) => a.name.localeCompare(b.name));
};
