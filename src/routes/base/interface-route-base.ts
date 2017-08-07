import { IRequest } from "../../models/requests/interface-request";
import { IResponse } from "../../models/responses/interface-response";

export interface IRouteBase {

    handle(request: IRequest, response: IResponse, next: Function): void;

}