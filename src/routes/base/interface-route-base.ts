import { IRequest } from "../../models/requests/base/interface-request";
import { IResponse } from "../../models/responses/base/interface-response";

export interface IRouteBase {

    handle(request: IRequest, response: IResponse, next: Function): void;

    permissionDenied(response: IResponse): void
}