import { BaseService } from "./base/base-service";
import { IBaseService } from "./base/interface-base-service";
import { Log } from "../models/cores/log";
import { LogsDBModel } from "../databases/database-context";

class LogService extends BaseService<Log> implements IBaseService<Log> {

    constructor() {
        super(LogsDBModel);
    }

    public addLog(log: Log): Promise<Log> {
        return new Promise((resolve, reject) => {
            LogsDBModel.create(log).then((log) => {
                resolve(log);
            }).catch((err) => {
                throw err;
            });
        });
    }
}

let logService = new LogService();

export { logService as LogService };
