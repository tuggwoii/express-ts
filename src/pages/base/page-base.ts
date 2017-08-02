import { IPageBase } from "./interface-page-base";

declare function require(name: string);
declare const global: any;
const fs: any = require('fs');
const path: any = require('path');

export class PageBase implements IPageBase {

    public url: string = '/';

    public view: string = 'static/views/pages/index.html';

    public response(response: any) {
        response.status(200).render(path.join(global.rootDir, this.view));
    }
}