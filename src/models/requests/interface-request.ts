import { RequestMethods } from "./request-methods";

export interface IRequest {

    url: string;

    method: RequestMethods

    body: any;

}