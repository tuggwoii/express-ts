import { IApiBase } from "./base/interface-api-base";
import { ApiBase } from "./base/api-base";
import { Route } from "../models/routes/route";

class UserApi extends ApiBase implements IApiBase {

    public baseUrl: string = '/users';

    public routes: Route[] = [
        new Route(this.mapRoute('/me'), this.me)
    ];

    public me(request: any, response: any, next: Function) {
        this.success(response, { message: 'Hello There' });
    }
}

let userApi = new UserApi();

export { userApi as UserApi }