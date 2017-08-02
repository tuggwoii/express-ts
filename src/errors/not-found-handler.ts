import { IErrorHandlerBase } from "./base/interface-error-handler-base";
import { ErrorHandlerBase } from "./base/error-handler-base";

class NotFoundErrorHandler extends ErrorHandlerBase implements IErrorHandlerBase {

    public handle(request: any, response: any) {
        response.status(404).send('not found')
    }
}

let notFoundHandler = new NotFoundErrorHandler();

export = notFoundHandler;