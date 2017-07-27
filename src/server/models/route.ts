import { RouteHandler } from "./route-handler";

export class Route {

    constructor(url: string, handler: RouteHandler) {
        this.url = url;
        this.handler = handler;
    }

    public url: string;

    public handler: RouteHandler

}