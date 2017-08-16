import { IMiddleWare } from "./base/interface-middleware";
import { IRequest } from "../models/requests/interface-request";
import { IResponse } from "../models/responses/interface-response";
import * as envConfig from "../configs/config";
import * as UserRolesDBModel from "../databases/models/user-roles";
import * as UsersDBModel from "../databases/models/users";
import { RequestHeader } from "../models/requests/request-header";
import * as UserService from "../services/user-service";

class AuthenticationMiddleWare implements IMiddleWare {

    public execute(config?: any): Function {

        return (request: IRequest, response: IResponse, next: Function) => { 

            let headers = new RequestHeader(request.headers);

            if (headers.authorization) {

                let token = headers.authorization;

                (async () => {

                    let user = await UserService.GetUserByToken(token);

                    if (user) {

                        //assign user to request context
                        request.user = user;

                        //roll token if the client send request with new token
                        if (user.refreshToken == token) {

                            //roll token
                            user = await UserService.RollToken(user.id);

                            //check is token roll success?
                            if (user) {
                                //if success => update user in request context
                                request.user = user;
                            }
                            else {
                                //fail remove user from request context
                                request.user = null;
                            }
                        }
                    }

                    next();
  
                })();
            }
            else {
                next();
            }
        }
    }
}

let Authentication = new AuthenticationMiddleWare().execute;

export = Authentication;