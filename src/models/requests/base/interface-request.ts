import { RequestMethods } from "./request-methods";
import { RequestHeader } from "./request-header";
import { User } from "../../cores/user";
import { Paging } from "../paging/paging";

export interface IRequest {

    headers: RequestHeader;

    url: string;

    originalUrl: string;

    method: RequestMethods

    body: any;

    user: User

    connection: any;

    params: any;

    queryStrings: any;

    cookies: any;

    paging: Paging;
}