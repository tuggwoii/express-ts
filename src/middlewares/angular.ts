import { IMiddleWare } from "./base/interface-middleware";
import { IResponse } from "../models/responses/base/interface-response";
import { IRequest } from "../models/requests/base/interface-request";
import { ServerErrorHandler } from '../errors/server-error-handler';
import { RequestHeader } from "../models/requests/base/request-header";

declare const global: any;
const fs: any = require('fs');
const path: any = require('path');

class AngularAssetsServeMiddleWare implements IMiddleWare {

    private caches: string;

    public execute(config?: any): Function {
        return (request: IRequest, response: IResponse, next: Function) => {
            if (this.isAngularAssets(request.url)) {
                if (request.url.indexOf('.js.map') > -1) {
                    response.send(fs.readFileSync(path.join(global.rootDir, 'static/js/' + request.url)));
                } else if (request.url.indexOf('.js') > -1) {
                    response.status(200).send(fs.readFileSync(path.join(global.rootDir, 'static/js/' +request.url)));
                } else if (request.url.indexOf('.css') > -1) {
                    response.writeHead(200, { 'Content-Type': 'text/css' });
                    response.write(fs.readFileSync(path.join(global.rootDir, 'static/css/' + request.url)));
                    response.end();
                } else {
                    next();
                }
            } else {
                next();
            }
        }
    }

    private isAngularAssets(path: string) {
        if ((path.indexOf('polyfills.') > -1 ||
            path.indexOf('main.') ||
            path.indexOf('styles.') ||
            path.indexOf('vendor.') ||
            path.indexOf('inline.')) &&
            path.indexOf('.bundle.') > -1) {
            return true;
        }
        return false;
    }
}

let angularAssetsServeMiddleWare = new AngularAssetsServeMiddleWare();

export { angularAssetsServeMiddleWare as AngularAssets };
