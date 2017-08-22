import { IApiBaseController } from "./base/interface-api-base-controller";
import { IResponse } from "../../models/responses/base/interface-response";
import { ApiBaseController } from "./base/api-base-controller";
import { Route } from "../../models/routes/route";
import { LoggedInUser } from "../../models/responses/users/logged-in-user";
import { SimpleUser } from "../../models/responses/users/simple-user";
import { RequestMethods } from "../../models/requests/base/request-methods";
import { IRequest } from "../../models/requests/base/interface-request";
import { Login } from "../../models/requests/users/login";
import { RoleTypes } from "../../models/cores/role-types";

class UserApiController extends ApiBaseController implements IApiBaseController {

    public baseUrl: string = '/users';

    public routes: Route[] = [
        new Route(this, this.mapRoute('/login'), RequestMethods.POST, this.login),
        new Route(this, this.mapRoute('/me'), RequestMethods.GET, this.me, [ RoleTypes.User, RoleTypes.Administrator ])
    ];

    public me(context: IApiBaseController, request: IRequest, response: IResponse) {

        context.success(response, new SimpleUser(request.user));
    }

    public login(context: IApiBaseController, request: IRequest, response: IResponse) {

        let login = new Login(request.body);

        login.isValid().then((user) => {
            context.success(response, new LoggedInUser(user))
        }).catch((err) => {
            context.badRequest(response, err)
        })
    }
}

let userApiController = new UserApiController();

export {
    userApiController as UserApiController
}