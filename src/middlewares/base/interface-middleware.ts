import { IRequest } from "../../models/requests/interface-request";
import { IResponse } from "../../models/responses/interface-response";

export interface IMiddleWare {
    execute(config?: any): Function;
}