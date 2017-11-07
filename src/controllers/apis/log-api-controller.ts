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
            new Route('', RequestMethods.GET, (request: IRequest, response: IResponse) => this.getAll(request, response), [RoleTypes.Administrator]),
            new Route('/{id}', RequestMethods.GET, (request: IRequest, response: IResponse) => this.getById(request, response), [RoleTypes.Administrator])
        ]);
    }

    public getAll(request: IRequest, response: IResponse) {
        console.log('aaa');
        (async () => {
            let query = await this.createPagingQuery(this.service, request);
            let results = await this.service.getAll(query);
            let meta = this.createPagingMeta(request);
            this.success(response, results, meta);
        })().catch((err) => {
                this.serverError(request, response, err);
        });
    }

    public getById(request: IRequest, response: IResponse) {
        (async () => {
            if (request.params.id && !isNaN(parseInt(request.params.id))) {
                let result = await this.service.getOne({ where: { id: request.params.id } });
                if (result) {
                    this.success(response, result);
                }
                else {
                    this.notFound(request, response);
                }
            }
            else {
                this.notFound(request, response);
            }
        })().catch((err) => {
            this.serverError(request, response, err);
        });
    }

}

let logApiController = new LogApiController();

export { logApiController as LogApiController };
