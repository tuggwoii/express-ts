import { RequestMethods } from "./request-methods";
import { RequestHeader } from "./request-header";

export interface IRequest {

    headers: RequestHeader;

    url: string;

    method: RequestMethods

    body: any;
}