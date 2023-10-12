import { findIndex } from "./helpers";

const SORTED_FIRST_EXTENSIONS = [1, 204]; // CET Designer & CET Developer
const SORTED_FIRST_COUNT = SORTED_FIRST_EXTENSIONS.length;

export function compareBy<K extends string | number>(key: K, ascending: boolean) {
	return function (
		a: Record<K, string | number | boolean | null | undefined>,
		b: Record<K, string | number | boolean | null | undefined>
	) {
		let aValue = a[key];
		let bValue = b[key];

		if (typeof aValue === "string") {
			aValue = aValue.toLowerCase();
		}

		if (typeof bValue === "string") {
			bValue = bValue.toLowerCase();
		}

		if (Number(aValue)) {
			aValue = Number(aValue);
		}
		if (Number(bValue)) {
			bValue = Number(bValue);
		}

		if (
			(aValue && bValue && aValue < bValue) ||
			(aValue === null && bValue !== null) ||
			(aValue === undefined && bValue !== undefined)
		) {
			return ascending ? -1 : 1;
		}
		if (
			(aValue && bValue && aValue > bValue) ||
			(aValue !== null && bValue === null) ||
			(aValue !== undefined && bValue === undefined)
		) {
			return ascending ? 1 : -1;
		}
		return 0;
	};
}

export type HasExtension = { extensionId: number; extensionName: string };

export function compareExtensionOrder<U extends HasExtension, V extends HasExtension>(a: U, b: V) {
	let aOrder = findIndex(id => id === a.extensionId, SORTED_FIRST_EXTENSIONS);
	aOrder = aOrder === undefined ? SORTED_FIRST_COUNT : aOrder;
	let bOrder = findIndex(id => id === b.extensionId, SORTED_FIRST_EXTENSIONS);
	bOrder = bOrder === undefined ? SORTED_FIRST_COUNT : bOrder;

	return aOrder - bOrder || a.extensionName.localeCompare(b.extensionName);
}
