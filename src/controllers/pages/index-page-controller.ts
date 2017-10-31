import { IPageBaseController } from "./base/interface-page-base-controller";
import { PageBaseController } from "./base/page-base-controller";
import { IPageModel } from "../../models/responses/pages/page-model-interface";
import { HomeModel } from "../../models/responses/pages/home-model";

class IndexPageController extends PageBaseController implements IPageBaseController {
    
    public url: string = '/';

    public view: string = 'static/views/pages/index.html';

    public model: IPageModel;

    constructor() {
        super();
        this.model = new HomeModel({
            title: 'Home'
        });
    }
}

let indexController = new IndexPageController();

export { indexController as IndexPageController };
