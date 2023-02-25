const trimLeadingSlash = (path: string): string => {
	if (path.startsWith('/')) {
		return trimLeadingSlash(path.substr(1));
	}

	return path;
};

const inner = (path: string): string => {
	if (typeof window !== 'undefined' && window.remotion_staticBase) {
		return `${window.remotion_staticBase}/${trimLeadingSlash(path)}`;
	}

	return `/${trimLeadingSlash(path)}`;
};

/**
 * Reference a file from the public/ folder.
 * If the file does not appear in the autocomplete, type the path manually.
 */
export const staticFile = (path: string) => {
	if (path.startsWith('http://') || path.startsWith('https://')) {
		throw new TypeError(
			`staticFile() does not support remote URLs - got "${path}". Instead, pass the URL without wrapping it in staticFile(). See: https://remotion.dev/docs/staticfile-remote-urls`
		);
	}

	if (path.startsWith('..') || path.startsWith('./')) {
		throw new TypeError(
			`staticFile() does not support relative paths - got "${path}". Instead, pass the name of a file that is inside the public/ folder. See: https://remotion.dev/docs/staticfile-relative-paths`
		);
	}

	const preparsed = inner(path);
	if (!preparsed.startsWith('/')) {
		return `/${preparsed}`;
	}

	return preparsed;
};
