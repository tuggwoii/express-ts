import { IPageBaseController } from "./base/interface-page-base-controller";
import { PageBaseController } from "./base/page-base-controller";

class IndexPageController extends PageBaseController implements IPageBaseController {
    
    public url: string = '/';

    public view: string = 'static/views/pages/index.html';
}

let indexComtroller = new IndexPageController();

export = indexComtroller;
