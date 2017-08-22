import { IMiddleWare } from "./base/interface-middleware";
import { IResponse } from "../models/responses/base/interface-response";
import { RequestHeader } from "../models/requests/base/request-header";
import { IRequest } from "../models/requests/base/interface-request";
import * as envConfig from "../configs/config";
import * as UserRolesDBModel from "../databases/models/user-roles";
import * as UsersDBModel from "../databases/models/users";
import * as UserService from "../services/user-service";
import { User } from "../models/cores/user";
import * as ErrorHandler from '../errors/server-error-handler';

class AuthenticationMiddleWare implements IMiddleWare {

    public execute(config?: any): Function {
        return (request: IRequest, response: IResponse, next: Function) => {
            let headers = new RequestHeader(request.headers);
            if (headers.authorization) {
                let token = headers.authorization;
                (async () => {
                    request.user = await this.doAuthentication(token);
                    next();
                })().catch((err) => {
                    next(err);
                });
            }
            else {
                next();
            }
        }
    }

    private doAuthentication(token: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            (async () => {
                let user = await UserService.GetUserByToken(token);
                if (user) {
                    if (user.refreshToken == token) {
                        user = await UserService.RollToken(user.id);
                    }
                }
                resolve(user);
            })().catch((err) => {
                reject(err);
            })
        });
    }
}

let Authentication = new AuthenticationMiddleWare();

export = Authentication;
