"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_api_1 = require("./base/base-api");
var route_1 = require("../models/route");
var route_handler_1 = require("../models/route-handler");
var UserApi = (function (_super) {
    __extends(UserApi, _super);
    function UserApi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.baseUrl = '/users';
        _this.routes = [
            new route_1.Route(_this.createRoute('/me'), new route_handler_1.RouteHandler(_this.me))
        ];
        return _this;
    }
    UserApi.prototype.me = function (request, response, next) {
        this.success(response, { message: 'Hello There' });
    };
    return UserApi;
}(base_api_1.BaseApi));
var userApi = new UserApi();
exports.UserApi = userApi;
//# sourceMappingURL=user-api.js.map