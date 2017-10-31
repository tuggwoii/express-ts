﻿import { IApiBaseController } from "./base/interface-api-base-controller";
import { IResponse } from "../../models/responses/base/interface-response";
import { ApiBaseController } from "./base/api-base-controller";
import { Route } from "../../models/routes/route";
import { LoggedInUser } from "../../models/responses/users/logged-in-user";
import { SimpleUser } from "../../models/responses/users/simple-user";
import { RequestMethods } from "../../models/requests/base/request-methods";
import { IRequest } from "../../models/requests/base/interface-request";
import { Login } from "../../models/requests/users/login";
import { RoleTypes } from "../../models/cores/role-types";
import { UserService } from "../../services/user-service";
import { User } from "../../models/cores/user";

class UserApiController extends ApiBaseController implements IApiBaseController {

    constructor() {

        super(UserService, '/users');

        this.createRoutes([
            new Route(this, '', RequestMethods.GET, this.getAll, [RoleTypes.Administrator]),
            new Route(this, '/{id}', RequestMethods.GET, this.getById, [RoleTypes.Administrator]),
            new Route(this, '/login', RequestMethods.POST, this.login),
            new Route(this, '/me', RequestMethods.GET, this.me, [RoleTypes.User, RoleTypes.Administrator])
        ]);
    }

    public getAll(context: IApiBaseController, request: IRequest, response: IResponse) {
        (async () => {
            let query = await context.createPagingQuery(context.service, request);
            let results = await context.service.getAll(query);
            let meta = context.createPagingMeta(request);
        })().catch((err) => {
            context.serverError(request, response, err);
        });
    }

    public getById(context: IApiBaseController, request: IRequest, response: IResponse) {
        (async () => {
            if (request.params.id && !isNaN(parseInt(request.params.id))) {
                let result = await context.service.getOne({ where: { id: request.params.id } });
                if (result) {
                    context.success(response, result);
                }
                else {
                    context.notFound(request, response);
                }
            }
            else {
                context.notFound(request, response);
            }
        })().catch((err) => {
            context.serverError(request, response, err);
        });
    }

    public me(context: IApiBaseController, request: IRequest, response: IResponse) {

        context.success(response, new SimpleUser(request.user));
    }

    public login(context: IApiBaseController, request: IRequest, response: IResponse) {

        let login = new Login(request.body);

        login.isValid().then((user) => {
            context.success(response, new LoggedInUser(user))
        }).catch((err) => {
            context.badRequest(request, response, err);
        })
    }
}

let userApiController = new UserApiController();

export { userApiController as UserApiController };