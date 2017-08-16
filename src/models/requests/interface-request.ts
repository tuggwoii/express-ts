import { RequestMethods } from "./request-methods";
import { RequestHeader } from "./request-header";
import { User } from "../cores/user";

export interface IRequest {

    headers: RequestHeader;

    url: string;

    method: RequestMethods

    body: any;

    user: User
}