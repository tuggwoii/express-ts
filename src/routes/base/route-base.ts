import { IRouteBase } from "./interface-route-base";
import { IRequest } from "../../models/requests/base/interface-request";
import { IResponse } from "../../models/responses/base/interface-response";
import { PermissionDeniedHandler } from "../../errors/permission-denied-handler";
import { Paging } from "../../models/requests/paging/paging";

export class RouteBase implements IRouteBase {

    public handle(request: IRequest, response: IResponse, next: Function): void {
        response.status(204).send({
            data: {},
            errors: [],
            meta: {}
        });
    }

    public removeTrilingSlash(request: IRequest) {
        if (request.url.slice(-1) == '/') {
            request.url = request.url.substring(0, request.url.length - 1);
        }
    }

    public parseQueryStrings(request: IRequest) {
        let urlPaths = request.url.split('?');
        let queryStrings = {};
        
        if (urlPaths.length > 1) {
            let queries = urlPaths[1].split('&');
            for (let i = 0; i < queries.length; i++) {
                if (queries[i]) {
                    let queryPaths = queries[i].split('=');
                    queryStrings[queryPaths[0]] = queryPaths[1];
                }
            }
        }

        request.url = urlPaths[0];
        request.queryStrings = queryStrings;
    }

    public parsePaging(request: IRequest) {
        if (request.queryStrings && request.queryStrings.page) {
            request.paging = new Paging({
                page: request.queryStrings.page,
                limit: request.queryStrings.limit,
                totalPage: 1,
                totalRecord: 0,
                offset: 0
            });
        }
    }

    public permissionDenied(request: IRequest, response: IResponse): void {
        PermissionDeniedHandler.handle(request, response);
    }

}
