import { IRouteBase } from "./interface-route-base";
import { IRequest } from "../../models/requests/base/interface-request";
import { IResponse } from "../../models/responses/base/interface-response";

export class RouteBase implements IRouteBase {

    public handle(request: IRequest, response: IResponse, next: Function): void {
        response.status(204).send('no content');
    }

    public permissionDenied(response: IResponse): void {
        response.status(401).send('permission denied');
    }

}
