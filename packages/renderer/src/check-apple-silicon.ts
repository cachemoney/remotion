import * as os from 'os';

export const checkNodeVersionAndWarnAboutRosetta = () => {
	// see https://github.com/nodejs/node/issues/41900#issuecomment-1113511254
	const cpus = os.cpus();
	const isAppleSilicon = cpus[0].model.includes('Apple');
	const isArm64 = os.arch() === 'arm64';
	const version = process.version.replace('v', '').split('.');
	const majorVersion = Number(version[0]);
	const requiredNodeVersion = 14;

	if (majorVersion < 13) {
		throw new Error(
			`Remotion requires at least Node ${requiredNodeVersion}. You currently have ${process.version}. Update your node version to ${requiredNodeVersion} to use Remotion.`
		);
	}

	if (isAppleSilicon && !isArm64) {
		const recommendedNodeVersion = 16;
		const recommendNodeUpgrade = majorVersion < recommendedNodeVersion;

		console.warn(
			[
				`⚠️  Apple Silicon detected but Node.JS running under Rosetta. This will cause performance issues.\n`,
				`Recommended actions:\n`,
				recommendNodeUpgrade
					? ` - Upgrade to Node ${recommendedNodeVersion} or later\n`
					: ' - Run Node using `arch -arm64` architecture\n',
				'See https://remotion.dev/docs/troubleshooting/rosetta for more information.',
				'---',
			]
				.filter(Boolean)
				.join('\n')
		);
	}
};
