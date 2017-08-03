import { IResponse } from "../../models/responses/interface-response";

export interface IPageBase {

    url: string;

    view: string;

    response(response: IResponse): void;
}