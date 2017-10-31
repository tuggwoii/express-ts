import { IMiddleWare } from "./base/interface-middleware";
import { IResponse } from "../models/responses/base/interface-response";
import { IRequest } from "../models/requests/base/interface-request";
import { User } from "../models/cores/user";
import { UserService } from "../services/user-service";
import { ServerErrorHandler } from '../errors/server-error-handler';
import { RequestHeader } from "../models/requests/base/request-header";
import { UserRolesDBModel } from "../databases/models/user-roles";
import { UsersDBModel }  from "../databases/models/users";

class AuthenticationMiddleWare implements IMiddleWare {

    public execute(config?: any): Function {
        return (request: IRequest, response: IResponse, next: Function) => {

            let headers = new RequestHeader(request.headers);
            let cookieToken = request.cookies.authorization;

            if (headers.authorization || cookieToken) {
                let token = headers.authorization || cookieToken;
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

let authenticationMiddleWare = new AuthenticationMiddleWare();

export { authenticationMiddleWare as Authentication };
