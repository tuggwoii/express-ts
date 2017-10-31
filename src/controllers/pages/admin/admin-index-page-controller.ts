import { IPageBaseController } from "../base/interface-page-base-controller";
import { PageBaseController } from "../base/page-base-controller";
import { IPageModel } from "../../../models/responses/pages/page-model-interface";
import { AdminDashboardModel } from "../../../models/responses/pages/admin-dashboard-model";
import { RoleTypes } from "../../../models/cores/role-types";

class AdminIndexPageController extends PageBaseController implements IPageBaseController {
    
    public url: string = '/admin';

    public view: string = 'static/views/admin/index.html';

    public model: IPageModel;

    public allowedRoles: Array<RoleTypes> = [RoleTypes.Administrator];

    constructor() {
        super();
        this.model = new AdminDashboardModel({
            title: 'Admin'
        });
    }
}

let adminIndexController = new AdminIndexPageController();

export { adminIndexController as AdminIndexPageController };
