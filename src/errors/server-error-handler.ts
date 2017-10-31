import { IErrorHandlerBase } from "./base/interface-error-handler-base";
import { ErrorHandlerBase } from "./base/error-handler-base";
import { IRequest } from "../models/requests/base/interface-request";
import { IResponse } from "../models/responses/base/interface-response";
import { Log } from "../models/cores/log";
import { LogService }  from "../services/log-service";

declare const global: any;
const fs: any = require('fs');
const path: any = require('path');

class ServerErrorHandler extends ErrorHandlerBase implements IErrorHandlerBase {

    private errorView: string = 'static/views/pages/500.html';

    public handle(err: any, request: IRequest, response: IResponse) {

        (async () => {

            let log = new Log({
                message: err.message,
                stackTrace: err.stack,
                body: JSON.stringify(request.body),
                url: request.originalUrl,
                ip: this.getIP(request),
                status: err.status ? err.status : 500
            });

            var result = await LogService.addLog(log);
            console.log(new Log(result));
        })();

        if (this.isApiRoute(request.originalUrl)) {
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

}

let serverError = new ServerErrorHandler();

export { serverError as ServerErrorHandler };