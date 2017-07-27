"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_api_1 = require("../apis/user-api");
var ApiRoutes = (function () {
    function ApiRoutes(request, response, next) {
        this.routes = [
            user_api_1.UserApi
        ];
        console.log('execute-route', request);
    }
    return ApiRoutes;
}());
exports.ApiRoutes = ApiRoutes;
//# sourceMappingURL=api-routes.js.map