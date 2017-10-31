import { IRequest } from "../../models/requests/base/interface-request";
import { IResponse } from "../../models/responses/base/interface-response";

export interface IRouteBase {

    handle(request: IRequest, response: IResponse, next: Function): void;

    removeTrilingSlash(request: IRequest): void

    parseQueryStrings(request: IRequest): void

    parsePaging(request: IRequest): void

    permissionDenied(request: IRequest, response: IResponse): void
}