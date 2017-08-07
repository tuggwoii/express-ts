import { IRouteBase } from "./base/interface-route-base";
import { IApiControllerBase } from "../apis/base/interface-api-base";
import { UserApiController } from "../apis/user-api";
import { Route } from "../models/routes/route";
import { IRequest } from "../models/requests/interface-request";
import { IResponse } from "../models/responses/interface-response";
import { RouteBase } from "./base/route-base";
import { RequestMethods } from "../models/requests/request-methods";

class ApiRoutes extends RouteBase implements IRouteBase {

    private routes: Array<IApiControllerBase> = [
        UserApiController
    ];

    public handle(request: IRequest, response: IResponse, next: Function) {

        let apiRoute = this.findApiRouteByUrl(
            request.url,
            request.method
        );

        if (apiRoute) {
            apiRoute.handler(request, response);
        }
        else {
            next();
        }
    }

    private findApiRouteByUrl(url: string, method: RequestMethods): Route {

        for (let i = 0; i < this.routes.length; i++) {

            let controller: IApiControllerBase = this.routes[i];

            for (let j = 0; j < controller.routes.length; j++) {

                let route: Route = controller.routes[j];

                let matchActual = this.isRouteRowMatch(route, url, method);
                if (matchActual) {

                    return route;
                }
            }
        }

        return null;
    }

    private isRouteRowMatch(route: Route, requestUrl: string, method: RequestMethods): boolean {

        return route.url.toLowerCase() === requestUrl.toLowerCase() && method === route.method;
    }
}

let apiRoutes = new ApiRoutes();

export = apiRoutes;
