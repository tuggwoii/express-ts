import { IErrorHandlerBase } from "./base/interface-error-handler-base";
import { ErrorHandlerBase } from "./base/error-handler-base";

class ServerErrorHandler extends ErrorHandlerBase implements IErrorHandlerBase {

    public handle(err: any, request: any, response: any) {
        console.log(err)
        response.status(500).send('Something broke!');
    }
}

let serverError = new ServerErrorHandler();

export = serverError;