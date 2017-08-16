import { IApiControllerBase } from "./base/interface-api-base";
import { ApiControllerBase } from "./base/api-base";
import { Route } from "../models/routes/route";
import { IRequest } from "../models/requests/interface-request";
import { IResponse } from "../models/responses/interface-response";
import { RequestMethods } from "../models/requests/request-methods";
import { Login } from "../models/requests/login";
import * as UserRolesDBModel from "../databases/models/user-roles";
import { SimpleUser } from "../models/responses/simple-user";

class UserApiController extends ApiControllerBase implements IApiControllerBase {

    public baseUrl: string = '/users';

    public routes: Route[] = [
        new Route(this, this.mapRoute('/login'), RequestMethods.POST, this.login),
        new Route(this, this.mapRoute('/me'), RequestMethods.GET, this.me)
    ];

    public me(context: IApiControllerBase, request: IRequest, response: IResponse) {

        console.log(request.user);

        context.success(response, new SimpleUser(request.user));
    }

    public login(context: IApiControllerBase, request: IRequest, response: IResponse) {

        let login = new Login(request.body);

        login.isValid().then((user) => {
            context.success(response, user);
        }).catch((err) => {
            context.badRequest(response, err);
        });
    }
}

let userApiController = new UserApiController();

export {
    userApiController as UserApiController
}