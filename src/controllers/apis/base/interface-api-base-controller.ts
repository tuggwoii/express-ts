import { Route } from "../../../models/routes/route";
import { IResponse } from "../../../models/responses/base/interface-response";
import { IBaseService } from "../../../services/base/interface-base-service";
import { IDatabaseModel } from "../../../models/base/interface-database-model";
import { IRequest } from "../../../models/requests/base/interface-request";

export interface IApiBaseController {

    service: IBaseService<IDatabaseModel>;

    baseUrl: string;

    routes: Route[];

    mapRoute(url: string): void;

    success(response: IResponse, data: any, meta?: any): void;

    badRequest(request: IRequest, response: IResponse, errs: any): void;

    notFound(request: IRequest, response: IResponse): void;

    serverError(equest: IRequest, response: IResponse, errs: any): void;

    permissionDenied(request: IRequest, response: IResponse): void;

    createRoutes(routes: Route[]): void;

    createPagingQuery(service: IBaseService<IDatabaseModel>, request: IRequest): any;

    createPagingMeta(request: IRequest): any
}