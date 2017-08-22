import { Route } from "../../../models/routes/route";
import { IResponse } from "../../../models/responses/base/interface-response";

export interface IApiBaseController {

    baseUrl: string

    routes: Route[];

    mapRoute(url: string);

    success(response: IResponse, data: any, meta?: any)

    badRequest(response: IResponse, errs: any, meta?: any)

    notFound(response: IResponse, errs: any, meta?: any)
}