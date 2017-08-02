import { Route } from "../../models/route";

export interface IApiBase {

    baseUrl: string

    routes: Route[];

    mapRoute(url: string);
}