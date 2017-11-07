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
import { UserService } from "../../services/user-service";
import { User } from "../../models/cores/user";

class UserApiController extends ApiBaseController implements IApiBaseController {

    constructor() {

        super(UserService, '/users');

        this.createRoutes([
            new Route('', RequestMethods.GET, (request: IRequest, response: IResponse) => this.getAll(request, response), [RoleTypes.Administrator]),
            new Route('/{id}', RequestMethods.GET, (request: IRequest, response: IResponse) => this.getById(request, response), [RoleTypes.Administrator]),
            new Route('/login', RequestMethods.POST, (request: IRequest, response: IResponse) => this.login(request, response)),
            new Route('/me', RequestMethods.GET, (request: IRequest, response: IResponse) => this.me(request, response), [RoleTypes.User, RoleTypes.Administrator])
        ]);
    }

    public getAll(request: IRequest, response: IResponse) {
        (async () => {
            let query = await this.createPagingQuery(this.service, request);
            let results = await this.service.getAll(query);
            let meta = this.createPagingMeta(request);
            this.success(response, results, meta);
        })().catch((err) => {
                this.serverError(request, response, err);
        });
    }

    public getById(request: IRequest, response: IResponse) {
        (async () => {
            if (request.params.id && !isNaN(parseInt(request.params.id))) {
                let result = await this.service.getOne({ where: { id: request.params.id } });
                if (result) {
                    this.success(response, result);
                }
                else {
                    this.notFound(request, response);
                }
            }
            else {
                this.notFound(request, response);
            }
        })().catch((err) => {
            this.serverError(request, response, err);
        });
    }

    public me(request: IRequest, response: IResponse) {

        this.success(response, new SimpleUser(request.user));
    }

    public login(request: IRequest, response: IResponse) {

        let login = new Login(request.body);

        login.isValid().then((user) => {
            this.success(response, new LoggedInUser(user))
        }).catch((err) => {
            this.badRequest(request, response, err);
        })
    }
}

let userApiController = new UserApiController();

export { userApiController as UserApiController };