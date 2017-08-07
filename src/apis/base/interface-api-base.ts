import { Route } from "../../models/routes/route";
import { IResponse } from "../../models/responses/interface-response";

export interface IApiControllerBase {

    baseUrl: string

    routes: Route[];

    mapRoute(url: string);

    success(response: IResponse, data: any, meta?: any)

    badRequest(response: IResponse, errs: any, meta?: any)
}