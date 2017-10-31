import { IErrorHandlerBase } from "./interface-error-handler-base";
import { IRequest } from "../../models/requests/base/interface-request";

export class ErrorHandlerBase implements IErrorHandlerBase {

    public handle(err: any, request: any, response: any) {
        throw new Error('Method not implemented.');
    }

    public isApiRoute(url: string): boolean {
        return url.indexOf('/api/') > -1;
    }

    public getIP(request: IRequest): string {
        return (request.headers['x-forwarded-for'] || '').split(',')[0]
            || request.connection.remoteAddress;
    }

}