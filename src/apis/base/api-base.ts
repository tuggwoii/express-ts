import { Route } from "../../models/route";
import { IApiBase} from "./interface-api-base";

export class ApiBase implements IApiBase {

    public routes: Route[];

    public baseUrl: string = '';

    public mapRoute(url: string) {
        return this.baseUrl + url;
    }

    public success(response: any, data: any) {

    }
}