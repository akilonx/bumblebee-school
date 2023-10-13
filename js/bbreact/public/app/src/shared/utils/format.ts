import { get as getCookieValue, NAMES } from "./cookies";

/**
 * Returns string with human readable file size
 * https://en.wikipedia.org/wiki/File_size
 */
export function fileSize(byteSize: number) {
	let convertedSize = 0;
	let unit = "";
	let decimals = 1;

	if (byteSize < 1024) {
		convertedSize = byteSize;
		decimals = 0;
		unit = "B";
	} else if (byteSize < Math.pow(1024, 2)) {
		convertedSize = byteSize / 1024;
		decimals = 0;
		unit = "KiB";
	} else if (byteSize < Math.pow(1024, 3)) {
		convertedSize = byteSize / Math.pow(1024, 2);
		unit = "MiB";
	} else if (byteSize < Math.pow(1024, 4)) {
		convertedSize = byteSize / Math.pow(1024, 3);
		unit = "GiB";
	} else if (byteSize < Math.pow(1024, 5)) {
		convertedSize = byteSize / Math.pow(1024, 4);
		unit = "TiB";
	} else if (byteSize < Math.pow(1024, 6)) {
		convertedSize = byteSize / Math.pow(1024, 5);
		unit = "PiB";
	}

	return Number(convertedSize).toFixed(decimals) + " " + unit;
}

/**
 * Returns string with lower case and dashes as separator
 */
export function kebabCase(string: string) {
	return string.toLowerCase().replace(/\s/g, "-");
}

/**
 * Returns string with lower case and underscore as separator
 */
export function snakeCase(string: string) {
	return string.toLowerCase().replace(/\s/g, "_");
}

/**
 * Returns string with lower case and underscore as separator
 */
export function kebabToSnakeCase(string: string) {
	return string.toLowerCase().replace(/-/g, "_");
}

/**
 * Returns string where the first letter is in uppercase
 */
export function uppercaseFirstLetter(string: string) {
	if (string === null || string === undefined) {
		return "";
	}

	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function capitalize(string: string) {
	if (string === null) {
		return "";
	}

	return string
		.split(" ")
		.map((string) => uppercaseFirstLetter(string))
		.join(" ");
}

/**
 * Simple string interpolation
 */
export function interpolate(string: string, args: Record<string, string | number>) {
	for (const key in args) {
		const arg = args[key];
		string = string.replace(RegExp("\\{{" + key + "\\}}", "g"), arg.toString());
		string = string.replace(RegExp("\\{" + key + "\\}", "g"), arg.toString()); // TODO: Remove after migration
	}

	return string;
}

const lang = getCookieValue(NAMES.LANGUAGE) || "en";

/**
 * Format currency with a specific currency code based on browser's language
 */
export function formatCurrency(value: number, currencyCode: string) {
	const formatted = new Intl.NumberFormat(lang, {
		style: "currency",
		currency: currencyCode,
		maximumFractionDigits: 2,
	}).format(value);
	return formatted;
}

/**
 * Format percent based on browser's language
 */
export function formatPercent(value: number) {
	const formatted = new Intl.NumberFormat(lang, {
		style: "percent",
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	}).format(value);
	return formatted;
}

/**
 * Get the decimal character separator for the current browser language.
 */
export function getDecimalSeparator() {
	return new Intl.NumberFormat(lang).format(1.1).substr(1, 1);
}
