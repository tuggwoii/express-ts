import { IApiBaseController } from "./base/interface-api-base-controller";
import { IResponse } from "../../models/responses/base/interface-response";
import { ApiBaseController } from "./base/api-base-controller";
import { Route } from "../../models/routes/route";
import { RequestMethods } from "../../models/requests/base/request-methods";
import { IRequest } from "../../models/requests/base/interface-request";
import { Log } from "../../models/cores/log";
import { RoleTypes } from "../../models/cores/role-types";
import { LogService } from "../../services/log-service";

class LogApiController extends ApiBaseController implements IApiBaseController {
    
    constructor() {

        super(LogService, '/logs');

        this.createRoutes([
            new Route(this, '', RequestMethods.GET, this.getAll, [RoleTypes.Administrator]),
            new Route(this, '/{id}', RequestMethods.GET, this.getById, [RoleTypes.Administrator])
        ]);
    }

    public getAll(context: IApiBaseController, request: IRequest, response: IResponse) {

        (async () => {
            let query = await context.createPagingQuery(context.service, request);
            let results = await context.service.getAll(query);
            let meta = context.createPagingMeta(request);
            context.success(response, results, meta);
        })().catch((err) => {
            context.serverError(request, response, err);
        });
    }

    public getById(context: IApiBaseController, request: IRequest, response: IResponse) {
        (async () => {
            if (request.params.id && !isNaN(parseInt(request.params.id))) {
                let result = await context.service.getOne({ where: { id: request.params.id } });
                if (result) {
                    context.success(response, result);
                }
                else {
                    context.notFound(request, response);
                }
            }
            else {
                context.notFound(request, response);
            }
        })().catch((err) => {
            context.serverError(request, response, err);
        });
    }

}

let logApiController = new LogApiController();

export { logApiController as LogApiController };
