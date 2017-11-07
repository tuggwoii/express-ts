import { IApiBaseController } from "../../controllers/apis/base/interface-api-base-controller";
import { IResponse } from "../responses/base/interface-response";
import { RequestMethods } from "../requests/base/request-methods";
import { IRequest } from "../requests/base/interface-request";
import { RoleTypes } from "../cores/role-types";
import { IDatabaseModel } from "../base/interface-database-model";

type Handler = (request: IRequest, response: IResponse) => void;

export class Route {

    public url: string;

    public method: RequestMethods;

    public allowedRoles: Array<RoleTypes>;

    public handler: Handler;

    constructor(url: string, method: RequestMethods, handler: Handler, roles?: Array<RoleTypes>) {
        this.url = url;
        this.method = method;
        this.allowedRoles = roles;
        this.handler = handler;
    }

}