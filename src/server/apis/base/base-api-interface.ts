import { Route } from "../../models/route";

export interface IBaseApi {

    baseUrl: string;

    routes: Array<Route>;
}