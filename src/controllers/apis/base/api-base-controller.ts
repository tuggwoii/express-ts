import { IApiBaseController } from "./interface-api-base-controller";
import { Route } from "../../../models/routes/route";
import { IResponse } from "../../../models/responses/base/interface-response";
import { Response } from "../../../models/responses/base/response";

export class ApiBaseController implements IApiBaseController {

    public routes: Route[];

    public baseUrl: string = '';

    public mapRoute(url: string) {

        return this.baseUrl + url;
    }

    public success(response: IResponse, data: any, meta?: any) {
        response.json(new Response({
            data: data,
            meta: meta ? meta : {},
            errors: []
        }));
    }

    public badRequest(response: IResponse, errs: any, meta?: any) {
        response.status(400).json(new Response({
            data: {},
            meta: meta ? meta : {},
            errors: errs
        }));
    }

    public notFound(response: IResponse, errs?: any, meta?: any) {
        response.status(404).json(new Response({
            data: {},
            meta: meta ? meta : {},
            errors: errs ? errs : ['resource not found']
        }));
    }
}