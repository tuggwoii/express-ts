import { Route } from "../../models/routes/route";

export interface IApiBase {

    baseUrl: string

    routes: Route[];

    mapRoute(url: string);
}