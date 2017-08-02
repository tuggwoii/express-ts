import { IErrorHandlerBase } from "./interface-error-handler-base";

export class ErrorHandlerBase implements IErrorHandlerBase {

    public handle(err: any, request: any, response: any) {
        throw new Error('Method not implemented.');
    }

}