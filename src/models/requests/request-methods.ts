import { Enum } from "typescript-string-enums";

export const RequestMethods = Enum("GET", "POST", "PUT", "PATCH", "DELETE");

export type RequestMethods = Enum<typeof RequestMethods>;