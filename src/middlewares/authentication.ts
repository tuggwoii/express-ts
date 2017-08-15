import { IMiddleWare } from "./base/interface-middleware";
import { IRequest } from "../models/requests/interface-request";
import { IResponse } from "../models/responses/interface-response";
import * as envConfig from "../configs/config";
import * as UserRolesDBModel from "../databases/models/user-roles";
import * as UsersDBModel from "../databases/models/users";
import { RequestHeader } from "../models/requests/request-header";

class AuthenticationMiddleWare implements IMiddleWare {

    public execute(config?: any): Function {

        return (request: IRequest, response: IResponse, next: Function) => {
            console.log(request.headers);
            let headers = new RequestHeader(request.headers);
            console.log(headers);
            if (headers.authorization) {
                (async () => {
                    let token = headers.authorization;
                    let user = await UsersDBModel.findOne({
                        where: {
                            $or: [
                                { token: token },
                                { refreshToken: token }
                            ]
                        }
                    });

                    if (user) {

                    }

                })();
            }

            next();
        }
    }
}

let Authentication = new AuthenticationMiddleWare().execute;

export = Authentication;