import { IResponse } from "../../../models/responses/base/interface-response";
import { IPageModel } from "../../../models/responses/pages/page-model-interface";
import { RoleTypes } from "../../../models/cores/role-types";

export interface IPageBaseController {

    url: string;

    view: string;

    model: IPageModel

    response(response: IResponse): void;

    allowedRoles: Array<RoleTypes>
}
