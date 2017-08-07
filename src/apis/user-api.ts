import { IApiControllerBase } from "./base/interface-api-base";
import { ApiControllerBase } from "./base/api-base";
import { Route } from "../models/routes/route";
import { IRequest } from "../models/requests/interface-request";
import { IResponse } from "../models/responses/interface-response";
import { RequestMethods } from "../models/requests/request-methods";
import * as UserRolesDBModel from "../databases/models/user-roles";
import { Login } from "../models/requests/login";

class UserApiController extends ApiControllerBase implements IApiControllerBase {

    public baseUrl: string = '/users';

    public routes: Route[] = [
        new Route(this, this.mapRoute('/login'), RequestMethods.POST, this.login),
        new Route(this, this.mapRoute('/me'), RequestMethods.GET, this.me)
    ];

    public me(context: IApiControllerBase, request: IRequest, response: IResponse) {

        context.success(response, { message: 'Hello There' });
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

export { userApiController as UserApiController }