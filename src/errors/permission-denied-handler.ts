import { IErrorHandlerBase } from "./base/interface-error-handler-base";
import { ErrorHandlerBase } from "./base/error-handler-base";
import { IRequest } from "../models/requests/base/interface-request";
import { IResponse } from "../models/responses/base/interface-response";
import { Log } from "../models/cores/log";
import { LogService }  from "../services/log-service";

declare const global: any;
const fs: any = require('fs');
const path: any = require('path');

class PermissionDeniedHandler extends ErrorHandlerBase implements IErrorHandlerBase {

    private errorView: string = 'static/views/pages/401.html';

    public handle(request: IRequest, response: IResponse) {

        (async () => {

            let log = new Log({
                message: 'Permission denied',
                stackTrace: 'Permission denied',
                body: JSON.stringify(request.body),
                url: request.originalUrl,
                ip: this.getIP(request),
                status: 401
            });

            var result = await LogService.addLog(log);
            console.log(new Log(result));
        })();

        if (this.isApiRoute(request.originalUrl)) {
            response.status(401).send({
                data: {},
                errors: ['Permission denied'],
                meta: {}
            });
        }
        else {
            response.status(401).render(path.join(global.rootDir, this.errorView));
        }
    }
}

let permissionDenied = new PermissionDeniedHandler();

export {
    permissionDenied as PermissionDeniedHandler
};