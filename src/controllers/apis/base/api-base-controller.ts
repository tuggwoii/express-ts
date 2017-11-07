import { IApiBaseController } from "./interface-api-base-controller";
import { IBaseService } from "../../../services/base/interface-base-service";
import { IDatabaseModel } from "../../../models/base/interface-database-model";
import { IRequest } from "../../../models/requests/base/interface-request";
import { IResponse } from "../../../models/responses/base/interface-response";

import { Route } from "../../../models/routes/route";
import { Response } from "../../../models/responses/base/response";
import { RequestMethods } from "../../../models/requests/base/request-methods";
import { ServerErrorHandler } from "../../../errors/server-error-handler";
import { NotFoundErrorHandler } from "../../../errors/not-found-handler";
import { PermissionDeniedHandler } from "../../../errors/permission-denied-handler";
import { Paging } from "../../../models/requests/paging/paging";

export class ApiBaseController implements IApiBaseController {
    
    public routes: Route[];

    public baseUrl: string;

    public service: IBaseService<IDatabaseModel>;

    constructor(service: IBaseService<IDatabaseModel>, baseUrl: string) {

        this.service = service;
        this.baseUrl = baseUrl;

        this.routes = [
            new Route(this.mapRoute(''), RequestMethods.GET, (request: IRequest, response: IResponse) => this.getAll(request, response)),
            new Route(this.mapRoute('/{id}'), RequestMethods.GET, (request: IRequest, response: IResponse) => this.getById(request, response))
        ];
    }

    public mapRoute(url: string) {
        var routeUrl = (this.baseUrl + url).toLowerCase();
        var routeUrlLength = routeUrl.length;
        if (routeUrl.slice(-1) == '/') {
            routeUrl = routeUrl.substring(0, routeUrlLength - 1);
        }
        return routeUrl;
    }

    public getAll(request: IRequest, response: IResponse) {
        (async () => {
            let query = await this.createPagingQuery(this.service, request);
            let results = await this.service.getAll(query);
            let meta = this.createPagingMeta(request);
            this.success(response, results, meta);
        })().catch((err) => {
                console.log(this);
                this.serverError(request, response, err);
        });
    }

    public getById(request: IRequest, response: IResponse) {
        (async () => {
            if (request.params.id && !isNaN(parseInt(request.params.id))) {
                let results = await this.service.getOne({ where: { id: request.params.id } });
                if (results) {
                    this.success(response, results);
                }
                else {
                    this.notFound(request, response);
                }
            }
            else {
                this.notFound(request, response);
            }
        })().catch((err) => {
            this.serverError(request, response, err);
        });
    }

    public success(response: IResponse, data: any, meta?: any) {
        response.json(new Response({
            data: data,
            meta: meta ? meta : {},
            errors: []
        }));
    }

    public badRequest(request: IRequest, response: IResponse, errs: any) {
        response.status(400).json(new Response({
            data: {},
            meta: {},
            errors: errs
        }));
    }

    public notFound(request: IRequest,response: IResponse) {
        NotFoundErrorHandler.handle(request, response )
    }

    public serverError(request: IRequest, response: IResponse, errs: any) {
        ServerErrorHandler.handle(errs, request, response);
    }

    public permissionDenied(request: IRequest, response: IResponse) {
        PermissionDeniedHandler.handle(request, response);
    }

    public createRoutes(routes: Route[]) {
        for (let i = 0; i < routes.length; i++) {
            routes[i].url = this.mapRoute(routes[i].url);
            let routeIndex = this.getRouteIndex(routes[i]);

            if (routeIndex > -1) {
                this.routes[routeIndex] = routes[i];
            }
            else {
                this.routes.push(routes[i]);
            }
        }
    }

    public createPagingQuery(service: IBaseService<IDatabaseModel>, request: IRequest): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log('in here');
            (async () => {
                console.log(request.paging);
                if (request.paging) {
                    let total = await service.count();
                    request.paging.calculate(total);
                    resolve({
                        limit: request.paging.limit,
                        offset: request.paging.offset
                    });
                }
                else {
                    resolve({});
                }
            })().catch((err) => {
                    console.log('reject');
                    reject(err);
            })
        });
    }

    public createPagingMeta(request: IRequest): any {
        if (request.paging) {
            let meta: any = request.paging;
            meta.nextPageUrl = request.paging.totalPage > request.paging.page ? this.replaceQueryString(request.originalUrl, 'page', (request.paging.page + 1) + '') : '';
            meta.previousPageUrl = request.paging.page > 1 ? this.replaceQueryString(request.originalUrl, 'page', (request.paging.page - 1) + '') : ''
            return meta;
        }
        return { };
    }

    public replaceQueryString(url: string, key: string, value: string): string {
        return '';
    }

    private getRouteIndex(route: Route): number {
        for (let i = 0; i < this.routes.length; i++) {
            if (route.url == this.routes[i].url) {
                return i;
            }
        }
        return -1;
    }
}