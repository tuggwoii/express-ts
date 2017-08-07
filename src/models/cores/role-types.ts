import { Enum } from "typescript-string-enums";

export const RoleTypes = Enum("Administrator", "User");

export type RoleTypes = Enum<typeof RoleTypes>;