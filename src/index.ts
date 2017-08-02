import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as ApiRoutes from './routes/api-routes';
import * as PageRoutes from './routes/page-routes';

declare function require(name: string);
declare const process: any;
declare const global: any;

const path: any = require('path');
const ejs: any = require('ejs');

global.rootDir = __dirname;

class Server {

    public app: express.Application;
    public port: number = process.env.PORT || 8000;

    constructor() {
        this.app = express();
        this.config();
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
        this.serveStatic();
    }

    private serveStatic(): void {
        this.app.use('/css', express.static(path.join(__dirname, 'static/css')));
        this.app.use('/js', express.static(path.join(__dirname, 'static/js')));
        this.app.use('/images', express.static(path.join(__dirname, 'static/images')));
        this.app.use('/favicon.ico', express.static(path.join(__dirname, 'static/images/favicon.ico')));
    }

    private routes(): void {

        this.app.use('/api', (request: any, response: any, next: Function) => {
            ApiRoutes.handler(request, response, next);
        })

        this.app.use('/', (request: any, response: any, next: Function) => {
            PageRoutes.handler(request, response, next);
        })

        this.app.use('*', (request: any, response: any, next: Function) => {
            response.status(404).send('not found')
        })

        this.app.use((err: any, request: any, response: any, next: Function) => {
            console.log(err)
            response.status(500).send('Something broke!');
        })
    }

    private run(): void {
        this.app.listen(this.port, () => {
            console.log('App runing on port ' + this.port);
        })
    }
}

export =  Server.bootstrap();
