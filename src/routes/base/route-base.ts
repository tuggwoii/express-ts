
import { IRouteBase } from "./interface-route-base";
import { IRequest } from "../../models/requests/interface-request";
import { IResponse } from "../../models/responses/interface-response";
import { Response } from "../../models/responses/response";

export class RouteBase implements IRouteBase {

    handle(request: IRequest, response: IResponse, next: Function): void {
        
    }
}