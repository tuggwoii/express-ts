import { IApiBaseController } from "../controllers/apis/base/interface-api-base-controller";
import { IDatabaseModel } from "../models/base/interface-database-model";
import { IRequest } from "../models/requests/base/interface-request";
import { IResponse } from "../models/responses/base/interface-response";
import { IRouteBase } from "./base/interface-route-base";
import { RouteBase } from "./base/route-base";
import { Route } from "../models/routes/route";
import { RequestMethods } from "../models/requests/base/request-methods";
import { UserApiController } from "../controllers/apis/user-api-controller";
import { LogApiController } from "../controllers/apis/log-api-controller";
import { UserRole } from "../models/cores/user-role";
import { RoleTypes } from "../models/cores/role-types";
import { User } from "../models/cores/user";
import { Role } from "../models/cores/role";
import { StringHelper } from "../helpers/string-helper";

class ApiRoutes extends RouteBase implements IRouteBase {

    private routes: Array<IApiBaseController> = [
        UserApiController,
        LogApiController
    ];

    public handle(request: IRequest, response: IResponse, next: Function) {

        this.parseQueryStrings(request);
        this.parsePaging(request);
        this.removeTrilingSlash(request);
        
        let apiRoute = this.findApiRouteByUrl(request);

        if (apiRoute) {
            let allowAccess = this.isAllowAccess(request.user, apiRoute);
            if (allowAccess) {
                apiRoute.handler(request, response);
            }
            else {
                this.permissionDenied(request, response);
            }
        }
        else {
            next();
        }
    }

    public findApiRouteByUrl(request: IRequest): Route {

        for (let i = 0; i < this.routes.length; i++) {

            let controller: IApiBaseController = this.routes[i];

            for (let j = 0; j < controller.routes.length; j++) {

                let route: Route = controller.routes[j];

                let matchActual = this.isRouteMatch(route, request);
                if (matchActual) {
                    return route;
                }

                let matchParams = this.isRouteMatchParams(route, request);
                if (matchParams) {
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

    private isRouteMatch(route: Route, request: IRequest): boolean {
        return route.url.toLowerCase() === request.url.toLowerCase() && request.method === route.method;
    }

    private isRouteMatchParams(route: Route, request: IRequest): boolean {
        if (request.method !== route.method) {
            return false;
        }

        var routePaths = route.url.split('/');
        var paths = request.url.toLowerCase().split('/');

        if (routePaths.length != paths.length) {
            return false;
        }

        let params = {};

        for (let i = 0; i < paths.length; i++) {
            if (paths[i] != routePaths[i] && i == 0) {
                return false;
            }
            if (paths[i] != routePaths[i] &&
                routePaths[i].substring(0, 1) == '{' &&
                routePaths[i].slice(-1) == '}') {
                var paramName = StringHelper.onlyLetters(routePaths[i]);
                if (paramName) {
                    params[paramName] = paths[i];
                }
            }
            else if (paths[i] != routePaths[i]) {
                return false;
            }
        }

        request.params = params;
        
        return true;
    }
}

let apiRoutes = new ApiRoutes();

export { apiRoutes as ApiRoutes };
