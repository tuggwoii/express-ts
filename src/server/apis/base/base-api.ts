import { Route } from "../../models/route";
import { IBaseApi } from "./base-api-interface";

export class BaseApi {

    public baseUrl: string = '';

    public createRoute(url: string) {
        return this.baseUrl + url;
    }

    public success(response: Object, data: Object) {

    }
}