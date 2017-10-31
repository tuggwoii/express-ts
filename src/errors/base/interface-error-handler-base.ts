import { IRequest } from "../../models/requests/base/interface-request";

export interface IErrorHandlerBase {

    handle(err: any, request: any, response: any);

    isApiRoute(url: string): boolean;

    getIP(request: IRequest): string;
}