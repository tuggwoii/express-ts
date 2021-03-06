﻿import { IErrorHandlerBase } from "./base/interface-error-handler-base";
import { ErrorHandlerBase } from "./base/error-handler-base";
import { Log } from "../models/cores/log";
import { LogService } from "../services/log-service";
import { IRequest } from "../models/requests/base/interface-request";
import { IResponse } from "../models/responses/base/interface-response";

declare const global: any;
const fs: any = require('fs');
const path: any = require('path');

class NotFoundErrorHandler extends ErrorHandlerBase implements IErrorHandlerBase {

    private errorView: string = 'static/views/pages/404.html';

    public handle(request: IRequest, response: IResponse) {

        (async () => {

            let log = new Log({
                message: 'resource not found',
                stackTrace: 'resource not found',
                body: JSON.stringify(request.body),
                url: request.originalUrl,
                ip: this.getIP(request),
                status: 404
            });

            var result = await LogService.addLog(log);
            console.log(new Log(result));
        })();

        if (this.isApiRoute(request.originalUrl)) {
            response.status(404).send({
                data: {},
                errors: ['resources not found or get deleted.'],
                meta: {}
            });
        }
        else {
            response.status(404).render(path.join(global.rootDir, this.errorView));
        }

    }
}

let notFoundHandler = new NotFoundErrorHandler();

export { notFoundHandler as NotFoundErrorHandler };