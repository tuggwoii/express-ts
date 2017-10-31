import { IPageBaseController } from "../controllers/pages/base/interface-page-base-controller";
import { IRouteBase } from "./base/interface-route-base";
import { RouteBase } from "./base/route-base";
import { IndexPageController } from "../controllers/pages/index-page-controller";
import { IRequest } from "../models/requests/base/interface-request";
import { IResponse } from "../models/responses/base/interface-response";
import { AdminIndexPageController } from "../controllers/pages/admin/admin-index-page-controller";
import { User } from "../models/cores/user";
import { Route } from "../models/routes/route";
import { RoleTypes } from "../models/cores/role-types";
import { Role } from "../models/cores/role";

class PageRoutes extends RouteBase implements IRouteBase {

    public handle(request: IRequest, response: IResponse, next: Function) {

        this.parseQueryStrings(request);

        let route = this.findRoute(request.url);

        if (route) {

            let isAllowAccess = this.isAllowAccess(request.user, route.allowedRoles);
            if (isAllowAccess) {
                route.response(response);
            }
            else {
                this.permissionDenied(request, response);
            }
        }
        else {
            next();
        }
    }

    private isAllowAccess(user: User, allowedRoles: Array<RoleTypes>) {
        if (!allowedRoles || allowedRoles.length == 0) {
            return true;
        }

        if (!user || !user.roles || user.roles.length == 0) {
            return false;
        }

        for (let i = 0; i < user.roles.length; i++) {
            let role: Role = user.roles[i].role;
            if (role) {
                for (let j = 0; j < allowedRoles.length; j++) {
                    let allowedRole = allowedRoles[j];
                    if (role.name === allowedRole) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    private findRoute(url: string): IPageBaseController {

        for (let i = 0; i < this.routes.length; i++) {
            let route = this.routes[i];
            if (route.url.toLowerCase() === url.toLowerCase()) {
                return route;
            }
        }

        return null;
    }

    private routes: Array<IPageBaseController> = [
        IndexPageController,
        AdminIndexPageController
    ];
}

let pageRoutes = new PageRoutes();

export { pageRoutes as PageRoutes };
