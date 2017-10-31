import { IMiddleWare } from "./base/interface-middleware";
import { IResponse } from "../models/responses/base/interface-response";
import { IRequest } from "../models/requests/base/interface-request";
import { ServerErrorHandler } from '../errors/server-error-handler';
import { RequestHeader } from "../models/requests/base/request-header";

class AngularAssetsServeMiddleWare implements IMiddleWare {

    private caches: string;

    public execute(config?: any): Function {
        return (request: IRequest, response: IResponse, next: Function) => {
            
            next();
        }
    }
}

let angularAssetsServeMiddleWare = new AngularAssetsServeMiddleWare();

export { angularAssetsServeMiddleWare as AngularAssets };
