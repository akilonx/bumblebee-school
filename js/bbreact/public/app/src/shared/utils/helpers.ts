import { v4 as uuidv4 } from "uuid";

/*********************************************************
 * Classes
 *********************************************************/

export function addClass(element: Element, className: string) {
	element.classList.add(className);
}

export function addClasses(element: Element, classNames: string[]) {
	for (const className of classNames) {
		addClass(element, className);
	}
}

export function classNames(names: Array<string | Option<boolean>>): string {
	return names.filter((name) => typeof name === "string").join(" ");
}

export function removeClass(element: Element, className: string) {
	element.classList.remove(className);
}

export function removeClasses(element: Element, classNames: string[]) {
	for (const className of classNames) {
		removeClass(element, className);
	}
}

export function hasClass(element: Element, classNames: string[]) {
	for (const className of classNames) {
		if (element.classList.contains(className)) {
			return true;
		}
	}

	return false;
}

/*********************************************************
 * Elements
 *********************************************************/

export function getElementIndex(element: Option<Element>) {
	if (element === undefined) {
		return;
	}
	let index = 0;
	while (element !== undefined) {
		element = element.previousElementSibling || undefined;
		if (element !== undefined) {
			index++;
		}
	}
	return index;
}

export function findAncestor(element: Element, classNames: string[]) {
	while (!hasClass(element, classNames)) {
		if (!element.parentElement) {
			return null;
		}
		element = element.parentElement;
	}

	return element;
}

/*********************************************************
 * Numbers
 *********************************************************/

/**
 * Range function
 *
 * @param start Starting number of the range
 * @param end Ending number of the range
 * @param step Step number of the range
 */
export function range(start: number, end: number, step: number = 1): Array<number> {
	if (start > end) {
		throw new Error("End is larger than Start");
	}

	if (start + step > end) {
		throw new Error("Cannot create a valid range since start + step is larger than the end");
	}

	if (start === end) {
		return [start];
	}

	let seed = start;
	const range = [start];
	while (seed < end) {
		seed += step;
		range.push(seed);
	}

	return range;
}

/****************************************
 * Various little functions
 ****************************************/

export function identity<T>(arg: T): T {
	return arg;
}

export function noop(_arg: any) {
	// Do nothing
}

export function existsIn<T>(haystack: T[], needle: T) {
	return haystack.indexOf(needle) > -1;
}

/**
 * Flattens an array of arrays to an array
 */
export function flatten<T>(array: Array<T[] | T>): T[] {
	const result: T[] = [];
	for (const item of array) {
		if (!Array.isArray(item)) {
			result.push(item);
			continue;
		}
		Array.prototype.push.apply(result, item);
	}
	return result;
}

/**
 * Search a tree structure for the property needleKey and return the values found.
 * Traverse the tree through edgeKey.
 */
export function findInTree<T, S extends keyof T, U extends keyof T>(
	root: T,
	edgeKey: S,
	needleKey: U
): Array<T[U]> {
	const hayStack: T[] = [root];
	const found: Array<T[U]> = [];
	while (hayStack.length > 0) {
		const node = hayStack.pop();
		if (node === undefined) {
			throw new Error("[findInTree] the popped node was undefined -- should not happen");
		}
		const needle = node && node[needleKey];
		if (needle !== undefined) {
			found.push(node && node[needleKey]);
		}
		const nextNodes = node && node[edgeKey];
		if (nextNodes !== undefined) {
			if (Array.isArray(nextNodes)) {
				Array.prototype.push.apply(hayStack, nextNodes);
			} else {
				hayStack.push(nextNodes as any as T);
			}
		}
	}
	return found;
}
/**
 * Returns maybeDefined if defined, else defaultValue
 */
export function withDefault<T>(maybeDefined: Option<T>, defaultValue: T) {
	return maybeDefined === undefined ? defaultValue : maybeDefined;
}

/**
 * Generate a random 15-character string for use as a pseudo-unique ID.
 */
export function generateRandomID(): string {
	return uuidv4();
}

/**
 * Group by a key
 */
export type TypedKeys<V, T> = {
	[Key in keyof T]: T[Key] extends V ? Key : never;
}[keyof T];
export type StringKeys<T> = TypedKeys<string, T>;
export type NumberKeys<T> = TypedKeys<number, T>;

export function groupBy<T, K extends TypedKeys<string | number, T> & string>(
	list: Array<T>,
	key: K
) {
	let result: { [L: string]: Array<T> } = {};
	return list.reduce(function (accum, item) {
		let group = item[key] as any as string;
		(accum[group] = accum[group] || []).push(item);
		return accum;
	}, result);
}

/**
 * Unique by a key
 */

export function unique<T, K extends TypedKeys<string | number, T> & string>(
	list: Array<T>,
	key: K
) {
	const matched = new Set();

	const filteredArray = list.filter((l) => {
		const duplicate = matched.has(l[key]);
		matched.add(l[key]);
		return !duplicate;
	});

	return filteredArray;
}

/**
 * Unique values by a key
 */

export function uniqueValues<T, K extends TypedKeys<string | number, T> & string>(
	list: Array<T>,
	key: K
) {
	return unique(list, key).map((i) => i[key]);
}

/**
 * Unique by a key
 */

export function deduplicate<T>(list: Array<T>) {
	const matched = new Set();

	const filteredArray = list.filter((item) => {
		const duplicate = matched.has(item);
		matched.add(item);
		return !duplicate;
	});

	return filteredArray;
}

/**
 * Returns false if arg is undefined or null, else true
 */
export function definedNotNull<T>(arg: Option<T> | null): arg is T {
	return arg !== undefined && arg !== null;
}

/**
 * Easing
 */
export function easing(t: number) {
	return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
}

/**
 * Checks whether all the supplied arguments are defined.
 * Returns true only if all arguments are defined (!== undefined).
 */
export function allDefined(...args: any[]) {
	return args.every(defined);
}

export function nonNull<T>(arg: T | null): arg is T {
	return arg !== null;
}

export function isNull<T>(arg: T | null): arg is null {
	return arg === null;
}

export function upperCaseFirstChar(s: string) {
	return s.length === 0 ? "" : s.substr(0, 1).toLocaleUpperCase() + s.substr(1);
}

/**
 * Returns false if arg is undefined, otherwise true.
 */
export function defined<T>(arg: Option<T>): arg is T {
	return arg !== undefined;
}

/**
 * Works like /find/ but returns the index of the found element instead of the element itself.
 */
export function findIndex<T>(predicate: (item: T) => boolean, items: T[]): Option<number> {
	for (let i = 0; i < items.length; i++) {
		if (predicate(items[i])) {
			return i;
		}
	}
}

/**
 * Array.prototype.find lacks support in IE11, so we implement our
 * own find function. Returns the first element matching given predicate.
 */

export function find<T>(predicate: (item: T) => boolean, items: T[]) {
	for (const item of items) {
		if (predicate(item)) {
			return item;
		}
	}
}

/**
 * Returns the first item in an array, or undefined if the array is empty
 */
export function first<T>(items: T[]): Option<T> {
	return items[0];
}

/**
 * Returns the last item in an array, or undefined if array is empty
 */
export function last<T>(items: T[]): Option<T> {
	const index = lastIndex(items);
	return index !== undefined ? items[index] : undefined;
}

export function lastIndex(items: any[]): Option<number> {
	const length = items.length;
	return length > 0 ? length - 1 : undefined;
}

/**
 * Returns an array where toInsert has been inserted between every item in items
 */
export function interleave<T>(toInsert: T, items: T[]): T[] {
	const result: T[] = [];
	const last = lastIndex(items);
	for (let i = 0; i < items.length; i++) {
		result.push(items[i]);
		if (i !== last) {
			result.push(toInsert);
		}
	}

	return result;
}

/**
 * Returns an array of words (separated by whitespace) that exist in a string
 */
export function getKeywords(text: string): string[] {
	return text.split(/\s+/).filter((word) => word !== "");
}

/**
 * Carry out a search among a set of items. The results will be sorted by a score given by
 * the getScore function.
 * @param items The items to search among
 * @param getScore The scoring function (high score means better match). A score of 0 means
 * an item does not match.
 * @param limit The max number of results to return
 */
export function search<T>(items: T[], getScore: (item: T) => number, limit: number): T[] {
	const rankedItems = items.map((item) => ({
		item,
		score: getScore(item),
	}));

	rankedItems.sort((a, b) => {
		if (a.score === b.score) {
			return 0;
		}
		return a.score > b.score ? -1 : 1;
	});

	const matchingItems = [];
	for (const item of rankedItems) {
		if (matchingItems.length >= limit) {
			break;
		}
		if (item.score > 0) {
			matchingItems.push(item.item);
		}
	}

	return matchingItems;
}

/**
 * Create a shallow copy of an object.
 */
export function copy<T, K extends keyof T>(first: T, second?: Pick<T, K>) {
	return Object.assign({}, first, second);
}

/**
 * Truncates a string to the given maxCharacters. If a truncationSuffix is provided, it's
 * truncate(5, "fabulous", "...") => "fabul..."
 */
export function truncate(
	maxCharacters: number,
	text: string,
	overflow: "clip" | "ellipsis" = "clip"
): string {
	if (text.length <= maxCharacters) {
		return text;
	}

	switch (overflow) {
		case "clip":
			return text.slice(0, maxCharacters);
		case "ellipsis":
			return text.slice(0, maxCharacters) + "...";
		default:
			throw new Error(`bad overflow: ${overflow}`);
	}
}

/**
 * Get basename from path
 */
export function basename(path: string) {
	return path.split(/[\\/]/).pop();
}

/**
 * Get hostname from URL
 */
export function getHostname(url: string) {
	const a = document.createElement("a");
	a.href = url;
	return a.hostname;
}

/**
 * Fetch
 */

export function fetchJSON<T = any>(
	url: string,
	method: "GET" | "POST" = "GET",
	skipDebug?: boolean
): Promise<T> {
	const options: RequestInit = {
		credentials: "include",
		headers: new Headers({ "Content-Type": "application/json; charset=utf-8" }),
		mode: "cors",
		method,
	};

	let response = fetch(url, options).then((response) => response.json());

	if (!skipDebug) {
		// response = response.then((response) => handleDebugResponse(response, url));
	}

	if (process.env.NODE_ENV !== "production") {
		response = response.then((response) => {
			if ((window as any).updateDevBar) {
				(window as any).updateDevBar(response.devBarData);
			}
			return response;
		});
	}

	// ! NOTE: No side-effects, moved these logics to Routes.tsx
	// if (!pure) {
	//   response = response.then((response) => handleNotLoggedInResponse(response));
	//   response = response.then((response) => handleTFAResponse(response));
	//   response = response.then((response) => handleVPNResponse(response));
	// }

	return response;
}

export function handleVPNResponse(response: { vpn?: number }) {
	if (!response) {
		return response;
	}

	if (response.vpn) {
		const nextURL = encodeURIComponent(window.location.toString());
		window.location.href = `/my/internal/vpn/${nextURL}`;
		return Error(
			"This page is only available over VPN. Redirecting you to the authentication page..."
		);
	}

	return response;
}

export function handleTFAResponse(response: { tfa_required?: boolean }) {
	if (!response) {
		return response;
	}

	if (response.tfa_required) {
		return Error(
			"This page is only available over secured login. Redirecting you to the authentication page..."
		);
	}

	return response;
}

/**
 * Scrolling
 */
function doScrolling(diff: number, callback?: () => void) {
	const startingY = window.pageYOffset;
	const duration = Math.min(Math.abs(diff), 1000);

	let start: number;
	if (duration > 0) {
		window.requestAnimationFrame(function step(time) {
			if (!start) {
				start = time;
			}
			// Elapsed miliseconds since start of scrolling.
			const elapsed = time - start;
			// Get percent of completion in range [0, 1].
			const percent = easing(Math.min(elapsed / duration, 1));

			window.scrollTo(0, startingY + diff * percent);

			// Proceed with animation as long as we wanted it to.
			if (elapsed < duration) {
				window.requestAnimationFrame(step);
			} else if (callback) {
				callback();
			}
		});
	} else if (callback !== undefined) {
		callback();
	}
}

export function scrollTo(target: HTMLElement, customOffset = 0, callback?: () => void) {
	const elemRect = target.getBoundingClientRect();
	setTimeout(function () {
		doScrolling(elemRect.top + customOffset, callback);
	}, 100);
}

/*********************************************************
 * Date & Time
 *********************************************************/

export function toUTCDate(date: Date) {
	const regex = /.*, (.*)[0-9]{2}:[0-9]{2}:[0-9]{2} GMT/;
	return date.toUTCString().replace(regex, "$1");
}

/*********************************************************
 * Export
 *********************************************************/

export function exportCSV(baseFilename: string, content: string) {
	const universalBOM = "\uFEFF";
	const link = document.createElement("a");
	const blob = new Blob([universalBOM + content], {
		type: "text/csv;charset=utf-8",
	});
	link.setAttribute("href", URL.createObjectURL(blob));
	link.setAttribute("download", `${baseFilename}.csv`);
	document.body.appendChild(link);

	link.click();
}
