import {symbolicateStackTrace} from '../symbolicate-stacktrace';
import {truthy} from '../truthy';
import {ErrorWithStackFrame} from './handle-javascript-exception';
import type {SymbolicateableError} from './symbolicateable-error';

export const symbolicateError = async (
	symbolicateableError: SymbolicateableError
): Promise<ErrorWithStackFrame> => {
	const {delayRenderCall, stackFrame} = symbolicateableError;
	const [mainErrorFrames, delayRenderFrames] = await Promise.all(
		[
			stackFrame ? symbolicateStackTrace(stackFrame) : null,
			delayRenderCall ? symbolicateStackTrace(delayRenderCall) : null,
		].filter(truthy)
	);

	const symbolicatedErr = new ErrorWithStackFrame({
		message: symbolicateableError.message,
		symbolicatedStackFrames: mainErrorFrames,
		frame: symbolicateableError.frame,
		name: symbolicateableError.name,
		delayRenderCall: delayRenderFrames,
	});

	return symbolicatedErr;
};
