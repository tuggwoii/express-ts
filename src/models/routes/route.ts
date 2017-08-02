export class Route {

    constructor(url: string, handler: Function) {
        this.url = url;
        this.handler = handler;
    }

    public url: string;

    public handler: Function;

}