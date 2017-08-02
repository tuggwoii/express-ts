import { IPageBase } from "../pages/base/interface-page-base";
import { IRouteBase } from "./base/interface-route-base";
import * as IndexPage from "../pages/index-page";

class PageRoutes implements IRouteBase {

    public handle(request: any, response: any, next: Function) {

        let route = this.findRoute(request.url);

        if (route) {
            route.response(response);
        }
        else {
            next();
        }

    }

    private findRoute(url: string): IPageBase {

        for (let i = 0; i < this.routes.length; i++) {
            let route = this.routes[i];
            if (route.url.toLowerCase() === url.toLowerCase()) {
                return route;
            }
        }

        return null;
    }

    private routes: Array<IPageBase> = [
        IndexPage
    ];
}

let pageRoutes = new PageRoutes();

export = pageRoutes;
