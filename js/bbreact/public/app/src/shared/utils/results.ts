import { find } from "./helpers";

export function isError(arg: any): arg is Error {
	return arg instanceof Error;
}

export function isOk<T>(arg: Result<T>): arg is T {
	return !(arg instanceof Error);
}

export function all<T>(args: Array<Promise<T>>): Promise<Result<T[]>> {
	return Promise.all(args).catch(e => (e instanceof Error ? e : Error(e)));
}

export function toResult<T>(arg: Promise<T>): Promise<Result<T>> {
	return arg.catch(e => (e instanceof Error ? e : Error(e)));
}

export function findError<T>(args: Array<Result<T>>): Option<Error> {
	const error = find(isError, args);
	if (isError(error)) {
		return error;
	}
}

export function hasNoErrors<T>(args: Array<Result<T>>): args is T[] {
	return findError(args) === undefined;
}

export function hasErrors<T>(args: Array<Result<T>>): args is Array<Result<T>> {
	return findError(args) !== undefined;
}
export class TranslatableError extends Error {
	constructor(message?: string, public values?: TranslationValues) {
		super(message);
		this.values = values;
		Object.setPrototypeOf(this, TranslatableError.prototype);
	}
}
