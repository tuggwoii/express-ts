import { IResponse } from "../../../models/responses/base/interface-response";

export interface IPageBaseController {

    url: string;

    view: string;

    response(response: IResponse): void;
}
