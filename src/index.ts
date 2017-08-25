//import modules
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as ApiRoutes from './routes/api-routes';
import * as PageRoutes from './routes/page-routes';
import * as ErrorHandler from './errors/server-error-handler';
import * as NotFoundHandler from './errors/not-found-handler';
import * as Authentication from "./middlewares/authentication";
import { IResponse } from "./models/responses/base/interface-response";
import { IRequest } from "./models/requests/base/interface-request";
import { DatabaseInitializer } from "./databases/database-initializer";

//declare globla variable
declare const process: any;
declare const global: any;

//nodejs import
const path: any = require('path');
const ejs: any = require('ejs');

//save app root path
global.rootDir = __dirname;

class Server {

    public app: express.Application;
    public port: number = process.env.PORT || 8000;

    constructor() {
        this.app = express();
        this.config();
        this.static();
        this.routes();
        this.run();
    }

    public static bootstrap(): Server {
        return new Server();
    }

    private config(): void {
        this.app.set('view engine', 'html');
        this.app.engine('html', ejs.renderFile);
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(Authentication.execute());
    }

    private static(): void {
        this.app.use('/libs', express.static(path.join(__dirname, 'node_modules')));
        this.app.use('/css', express.static(path.join(__dirname, 'static/css')));
        this.app.use('/js', express.static(path.join(__dirname, 'static/js')));
        this.app.use('/images', express.static(path.join(__dirname, 'static/images')));
        this.app.use('/favicon.ico', express.static(path.join(__dirname, 'static/images/favicon.ico')));
    }

    private routes(): void {

        this.app.use('/api', (request: IRequest, response: IResponse, next: Function) => {
            ApiRoutes.handle(request, response, next);
        })

        this.app.use('/', (request: IRequest, response: IResponse, next: Function) => {
            PageRoutes.handle(request, response, next);
        })

        this.app.use('*', (request: IRequest, response: IResponse, next: Function) => {
            NotFoundHandler.handle(request, response);
        })

        this.app.use((err: any, request: IRequest, response: IResponse, next: Function) => {
            ErrorHandler.handle(err, request, response);
        })
    }

    private run(): void {

        DatabaseInitializer.init().then(() => {
            this.app.listen(this.port, () => console.log('App runing on port ' + this.port));
        }).catch((err) => {
            console.log(err);
        })
    }
}

export = Server.bootstrap();
