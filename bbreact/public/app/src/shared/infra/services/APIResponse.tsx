import { Either } from "@core/Either";
import { Result } from "@core/Result";
import { APIErrorMessage } from "./APIErrorMessage";

export type APIResponse<T> = Either<APIErrorMessage, Result<T>>;
