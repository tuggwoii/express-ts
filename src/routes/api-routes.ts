import { IRouteBase } from "./base/interface-route-base";
import { IApiBase } from "../apis/base/interface-api-base";
import { UserApi } from "../apis/user-api";

class ApiRoutes implements IRouteBase {

    private routes: Array<IApiBase> = [
        UserApi

    ];

    public handler(request: any, response: any, next: Function) {
        
    }
}

let apiRoutes = new ApiRoutes();

export = apiRoutes;