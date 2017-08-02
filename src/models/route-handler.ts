export class RouteHandler {

    private handler: Function;

    constructor(handler: Function) {
        this.handler = handler;
    }

    public response(request: Object, response: Response, next: Function): void {
        this.handler(response, response, next);
    }
}