import { BaseApi } from "./base/base-api";
import { IBaseApi } from "./base/base-api-interface";
import { Route } from "../models/route";
import { RouteHandler } from "../models/route-handler";

class UserApi extends BaseApi implements IBaseApi {

    public baseUrl: string = '/users';

    public routes: Route[] = [
        new Route(this.createRoute('/me'), new RouteHandler(this.me))
    ];

    public me(request: Object, response: Object, next: Function) {
        this.success(response, { message: 'Hello There' });
    }
}

let userApi = new UserApi();

export { userApi as UserApi }