import { TranslatableError } from "./results";

declare global {
	export interface Translations {
		[propName: string]: Translation;
	}

	type Option<T> = T | undefined;
	type Result<T> = T | Error;
	type Loading<T> = T | "loading";

	type Translation = string | ((args: Array<string | number>) => string);

	type TranslationValues = Array<string | number> | { [index: string]: any };
	type TranslatableMessage = { message: string; values?: TranslationValues };
	type Translatable = string | TranslatableMessage | Error | TranslatableError;

	type Translator = (translatable: Translatable) => string;
}

export * from "./helpers";
export * from "./sort";
