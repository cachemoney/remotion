import {BundlerInternals} from '@remotion/bundler';
import {binaryPath as armBinaryPath} from '@remotion/compositor-linux-arm64-musl';
import {binaryPath as x64BinaryPath} from '@remotion/compositor-linux-x64-musl';
import fs from 'fs';
import path from 'path';
import {quit} from '../cli/helpers/quit';
import {
	FUNCTION_ZIP_ARM64,
	FUNCTION_ZIP_X86_64,
} from '../shared/function-zip-path';
import type {LambdaArchitecture} from '../shared/validate-architecture';
import zl = require('zip-lib');

const bundleLambda = async (arch: LambdaArchitecture) => {
	const outdir = path.join(__dirname, '..', `build-render`);
	fs.mkdirSync(outdir, {
		recursive: true,
	});
	const outfile = path.join(outdir, 'index.js');

	(fs.rmSync ?? fs.rmdirSync)(outdir, {recursive: true});
	fs.mkdirSync(outdir, {recursive: true});
	const template = require.resolve(
		path.join(__dirname, '..', 'functions', 'index')
	);

	await BundlerInternals.esbuild.build({
		platform: 'node',
		target: 'node14',
		bundle: true,
		outfile,
		entryPoints: [template],
		treeShaking: true,
		external: ['./compositor', './compositor.exe'],
	});

	const compositorFile = `${outdir}/compositor`;
	if (arch === 'arm64') {
		fs.copyFileSync(armBinaryPath, compositorFile);
		await zl.archiveFolder(outdir, FUNCTION_ZIP_ARM64);
	} else {
		fs.copyFileSync(x64BinaryPath, compositorFile);
		await zl.archiveFolder(outdir, FUNCTION_ZIP_X86_64);
	}

	fs.unlinkSync(compositorFile);
	fs.unlinkSync(outfile);
};

bundleLambda('arm64')
	.then(() => {
		console.log('Lambda bundled for arm64');
		return bundleLambda('x86_64');
	})
	.then(() => {
		console.log('Lambda bundled for x86_64');
	})
	.catch((err) => {
		console.log(err);
		quit(1);
	});
