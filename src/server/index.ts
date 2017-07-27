import * as express from 'express';
import * as bodyParser from 'body-parser';
import { ApiRoutes } from "./routes/api-routes";
declare const process : any;

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
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
    }

    private routes(): void {

        this.app.use('/api', (request: Object, response: Object, next: Function) =>
            new ApiRoutes(request, response, next));

        this.app.use('*', (req, res) => {
            throw 42;
            //res.status(404).send('not found')
        })

        this.app.use((err, req, res, next) => {
            console.log(err)
            res.status(500).send('Something broke!');
        })
    }

    private run(): void {
        this.app.listen(this.port, () => {
            console.log('App runing on port ' + this.port);
        })
    }
}

export =  Server.bootstrap();
