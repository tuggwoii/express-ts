import { Route } from "../../models/routes/route";
import { IApiControllerBase } from "./interface-api-base";
import { IResponse } from "../../models/responses/interface-response";
import { Response } from "../../models/responses/response";

export class ApiControllerBase implements IApiControllerBase {

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
}