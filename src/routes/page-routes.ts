import { IPageBaseController } from "../controllers/pages/base/interface-page-base-controller";
import { IRouteBase } from "./base/interface-route-base";
import { RouteBase } from "./base/route-base";
import * as IndexPageController from "../controllers/pages/index-page-controller";

class PageRoutes extends RouteBase implements IRouteBase {

    public handle(request: any, response: any, next: Function) {

        let route = this.findRoute(request.url);

        if (route) {
            route.response(response);
        }
        else {
            next();
        }
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
        IndexPageController
    ];
}

let pageRoutes = new PageRoutes();

export = pageRoutes;
