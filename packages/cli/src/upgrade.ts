import {RenderInternals} from '@remotion/renderer';
import path from 'path';
import {ConfigInternals} from './config';
import {getLatestRemotionVersion} from './get-latest-remotion-version';
import {listOfRemotionPackages} from './list-of-remotion-packages';
import {Log} from './log';
import type {PackageManager} from './preview-server/get-package-manager';
import {
	getPackageManager,
	lockFilePaths,
} from './preview-server/get-package-manager';

const getUpgradeCommand = ({
	manager,
	packages,
	version,
}: {
	manager: PackageManager;
	packages: string[];
	version: string;
}): string[] => {
	const pkgList = packages.map((p) => `${p}@${version}`);

	const commands: {[key in PackageManager]: string[]} = {
		npm: ['i', '--save-exact', ...pkgList],
		pnpm: ['i', '--save-exact', ...pkgList],
		yarn: ['add', '--exact', ...pkgList],
	};

	return commands[manager];
};

export const upgrade = async (
	remotionRoot: string,
	packageManager: string | undefined
) => {
	const packageJsonFilePath = path.join(remotionRoot, 'package.json');

	const packageJson = require(packageJsonFilePath);
	const dependencies = Object.keys(packageJson.dependencies);
	const devDependencies = Object.keys(packageJson.devDependencies ?? {});
	const optionalDependencies = Object.keys(
		packageJson.optionalDependencies ?? {}
	);
	const peerDependencies = Object.keys(packageJson.peerDependencies ?? {});
	const latestRemotionVersion = await getLatestRemotionVersion();
	Log.info('Newest Remotion version is', latestRemotionVersion);

	const manager = getPackageManager(remotionRoot, packageManager);

	if (manager === 'unknown') {
		throw new Error(
			`No lockfile was found in your project (one of ${lockFilePaths
				.map((p) => p.path)
				.join(', ')}). Install dependencies using your favorite manager!`
		);
	}

	const toUpgrade = listOfRemotionPackages.filter(
		(u) =>
			dependencies.includes(u) ||
			devDependencies.includes(u) ||
			optionalDependencies.includes(u) ||
			peerDependencies.includes(u)
	);

	const prom = RenderInternals.execa(
		manager.manager,
		getUpgradeCommand({
			manager: manager.manager,
			packages: toUpgrade,
			version: latestRemotionVersion,
		}),
		{
			stdio: 'inherit',
		}
	);
	if (
		RenderInternals.isEqualOrBelowLogLevel(
			ConfigInternals.Logging.getLogLevel(),
			'info'
		)
	) {
		prom.stdout?.pipe(process.stdout);
	}

	await prom;
	Log.info('⏫ Remotion has been upgraded!');
	Log.info('https://remotion.dev/changelog');
};
