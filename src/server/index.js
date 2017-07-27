"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var api_routes_1 = require("./routes/api-routes");
var Server = (function () {
    function Server() {
        this.port = process.env.PORT || 8000;
        this.app = express();
        this.config();
        this.routes();
        this.run();
    }
    Server.bootstrap = function () {
        return new Server();
    };
    Server.prototype.config = function () {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
    };
    Server.prototype.routes = function () {
        this.app.use('/api', function (request, response, next) {
            return new api_routes_1.ApiRoutes(request, response, next);
        });
        this.app.use('*', function (req, res) {
            throw 42;
            //res.status(404).send('not found')
        });
        this.app.use(function (err, req, res, next) {
            console.log(err);
            res.status(500).send('Something broke!');
        });
    };
    Server.prototype.run = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log('App runing on port ' + _this.port);
        });
    };
    return Server;
}());
module.exports = Server.bootstrap();
//# sourceMappingURL=index.js.map