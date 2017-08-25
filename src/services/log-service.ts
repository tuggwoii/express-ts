import { BaseService } from "./base-service";
import { IBaseService } from "./interface-base-service";
import { Log } from "../models/cores/log";
import { LogsDBModel } from "../databases/database-context";

class LogService extends BaseService<Log> implements IBaseService<Log> {

    constructor() {
        super(LogsDBModel);
    }

    public AddLog(log: Log): Promise<Log> {
        return new Promise((resolve, reject) => {
            LogsDBModel.create(log).then(() => {
                resolve();
            }).catch((err) => {
                throw err;
            });
        });
    }

    public GetAll(): Promise<Array<Log>> {
        return LogsDBModel.findAll();
    }
}

let logService = new LogService();

export = logService;
