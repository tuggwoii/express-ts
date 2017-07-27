import { IBaseApi } from "../apis/base/base-api-interface";
import { BaseApi } from "../apis/base/base-api";
import { UserApi }  from "../apis/user-api";

export class ApiRoutes {

    private routes: Array<IBaseApi> = [
        UserApi

    ];

    constructor(request: Object, response: Object, next: Function) {
        console.log('execute-route', request);
    }
}