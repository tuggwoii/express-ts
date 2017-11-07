export interface IResponse {

    send(data: Object): void;

    json(data: any): void;

    render(view: string, data?: Object): void;

    status(code: number): IResponse;

    writeHead(code: number, headers: any): IResponse;

    write(content: string): void;

    end(): void;
}