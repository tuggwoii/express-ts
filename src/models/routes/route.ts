import { RequestMethods } from "../requests/request-methods";
import { IApiControllerBase } from "../../apis/base/interface-api-base";
import { IRequest } from "../requests/interface-request";
import { IResponse } from "../responses/interface-response";

type Handler = (request: IRequest, response: IResponse) => void;

export class Route {

    constructor(controller: IApiControllerBase, url: string, method: RequestMethods, handler: Function) {

        this.url = url;
        this.method = method;
        this.controller = controller;
        this.controllerHandler = handler;
    }

    public controller: IApiControllerBase;

    public controllerHandler: Function

    public url: string;

    public method: RequestMethods;

    public handler: Handler = (request: IRequest, response: IResponse) => {

        this.controllerHandler(this.controller, request, response);
    };

}