import { IErrorHandlerBase } from "./base/interface-error-handler-base";
import { ErrorHandlerBase } from "./base/error-handler-base";
import { IRequest } from "../models/requests/base/interface-request";
import { IResponse } from "../models/responses/base/interface-response";
import { Log } from "../models/cores/log";

declare const global: any;
const fs: any = require('fs');
const path: any = require('path');

class ServerErrorHandler extends ErrorHandlerBase implements IErrorHandlerBase {

    private errorView: string = 'static/views/pages/error.html';

    public handle(err: any, request: IRequest, response: IResponse) {

        console.log(request.url);
        console.log(err);


        (async () => {

            let log = new Log({
                message: err.message,
                stackTrace: err.stack,
                body: request.body,
                url: request.url,
                ip: this.getIP(request)
            });



        })();

        if (this.isApiRoute(request.url)) {
            if (err.status == 400) {
                response.status(err.status).send({
                    data: {},
                    errors: ['Bad request. Invalid data.'],
                    meta: {}
                });
            }
            else {
                response.status(500).send({
                    data: {},
                    errors: ['Server error. Server is busy or something wrong happen.'],
                    meta: {}
                });
            }
        }
        else {
            response.status(500).render(path.join(global.rootDir, this.errorView));
        }
    }

    private isApiRoute(url: string): boolean {
        return url.indexOf('/api/') > -1;
    }

    private getIP(request: IRequest): string {
        return (request.headers['x-forwarded-for'] || '').split(',')[0]
            || request.connection.remoteAddress;
    }
}

let serverError = new ServerErrorHandler();

export = serverError;