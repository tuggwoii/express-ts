"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseApi = (function () {
    function BaseApi() {
        this.baseUrl = '';
    }
    BaseApi.prototype.createRoute = function (url) {
        return this.baseUrl + url;
    };
    BaseApi.prototype.success = function (response, data) {
    };
    return BaseApi;
}());
exports.BaseApi = BaseApi;
//# sourceMappingURL=base-api.js.map