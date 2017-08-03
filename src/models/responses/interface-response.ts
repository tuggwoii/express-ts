export interface IResponse {

    send(data: Object): void;

    json(data: JSON): void;

    render(view: string, data?: Object): void;

    status(code: number): IResponse;
}