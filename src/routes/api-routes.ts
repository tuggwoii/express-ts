import { IRouteBase } from "./base/interface-route-base";
import { IApiBaseController } from "../controllers/apis/base/interface-api-base-controller";
import { RouteBase } from "./base/route-base";
import { Route } from "../models/routes/route";
import { RequestMethods } from "../models/requests/base/request-methods";
import { UserApiController } from "../controllers/apis/user-api-controller";
import { IRequest } from "../models/requests/base/interface-request";
import { IResponse } from "../models/responses/base/interface-response";
import { UserRole } from "../models/cores/user-role";
import { RoleTypes } from "../models/cores/role-types";
import { User } from "../models/cores/user";
import { Role } from "../models/cores/role";

class ApiRoutes extends RouteBase implements IRouteBase {

    private routes: Array<IApiBaseController> = [
        UserApiController
    ];

    public handle(request: IRequest, response: IResponse, next: Function) {

        let apiRoute = this.findApiRouteByUrl(
            request.url,
            request.method
        );

        if (apiRoute) {
            let allowAccess = this.isAllowAccess(request.user, apiRoute);
            if (allowAccess) {
                apiRoute.handler(request, response);
            }
            else {
                this.permissionDenied(response);
            }
        }
        else {
            next();
        }
    }

    private findApiRouteByUrl(url: string, method: RequestMethods): Route {

        for (let i = 0; i < this.routes.length; i++) {

            let controller: IApiBaseController = this.routes[i];

            for (let j = 0; j < controller.routes.length; j++) {

                let route: Route = controller.routes[j];
                let matchActual = this.isRouteMatch(route, url, method);

                if (matchActual) {
                    return route;
                }
            }
        }

        return null;
    }

    private isAllowAccess(user: User, route: Route) {
        if (!route.allowedRoles || route.allowedRoles.length == 0) {
            return true;
        }
        if (!user || !user.roles || user.roles.length == 0) {
            return false;
        }

        for (let i = 0; i < user.roles.length; i++) {
            let role: Role = user.roles[i].role;
            if (role) {
                for (let j = 0; j < route.allowedRoles.length; j++) {
                    let allowedRole = route.allowedRoles[j];
                    if (role.name === allowedRole) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    private isRouteMatch(route: Route, requestUrl: string, method: RequestMethods): boolean {

        return route.url.toLowerCase() === requestUrl.toLowerCase() && method === route.method;
    }
}

let apiRoutes = new ApiRoutes();

export = apiRoutes;
