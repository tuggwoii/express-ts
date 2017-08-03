import { IMiddleWare } from "./base/interface-middleware";
import { IRequest } from "../models/requests/interface-request";
import { IResponse } from "../models/responses/interface-response";
import * as envConfig from "../configs/config";

class AuthenticationMiddleWare implements IMiddleWare {

    public execute(config?: any): Function {

        return (request: IRequest, response: IResponse, next: Function) => {
            
            next();
        }
    }
}

let Authentication = new AuthenticationMiddleWare().execute;

export = Authentication;