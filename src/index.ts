//import modules
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as ApiRoutes from './routes/api-routes';
import * as PageRoutes from './routes/page-routes';
import * as ErrorHandler from './errors/server-error-handler';
import * as NotFoundHandler from './errors/not-found-handler';

//declare globla variable
declare function require(name: string);
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
    }

    private static(): void {
        this.app.use('/css', express.static(path.join(__dirname, 'static/css')));
        this.app.use('/js', express.static(path.join(__dirname, 'static/js')));
        this.app.use('/images', express.static(path.join(__dirname, 'static/images')));
        this.app.use('/favicon.ico', express.static(path.join(__dirname, 'static/images/favicon.ico')));
    }

    private routes(): void {

        this.app.use('/api', (request: any, response: any, next: Function) => {
            ApiRoutes.handle(request, response, next);
        })

        this.app.use('/', (request: any, response: any, next: Function) => {
            PageRoutes.handle(request, response, next);
        })

        this.app.use('*', (request: any, response: any, next: Function) => {
            NotFoundHandler.handle(request, response)
        })

        this.app.use((err: any, request: any, response: any, next: Function) => {
            ErrorHandler.handle(err, request, response);
        })
    }

    private run(): void {
        this.app.listen(this.port, () => {
            console.log('App runing on port ' + this.port);
        })
    }
}

export = Server.bootstrap();
