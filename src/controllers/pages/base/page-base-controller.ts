import { IPageBaseController } from "./interface-page-base-controller";
import { IResponse } from "../../../models/responses/base/interface-response";
import { IPageModel } from "../../../models/responses/pages/page-model-interface";
import { RoleTypes } from "../../../models/cores/role-types";

declare const global: any;
const fs: any = require('fs');
const path: any = require('path');

export class PageBaseController implements IPageBaseController {

    public url: string = '/';

    public view: string = 'static/views/pages/index.html';

    public model: IPageModel;

    public allowedRoles: Array<RoleTypes> = [];

    public response(response: IResponse) {

        response.status(200)
            .render(path.join(global.rootDir, this.view), this.model);
    }
}