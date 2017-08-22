import { IPageBaseController } from "./interface-page-base-controller";
import { IResponse } from "../../../models/responses/base/interface-response";

declare const global: any;
const fs: any = require('fs');
const path: any = require('path');

export class PageBaseController implements IPageBaseController {

    public url: string = '/';

    public view: string = 'static/views/pages/index.html';

    public response(response: IResponse) {
        response.status(200)
        .render(path.join(global.rootDir, this.view));
    }
}