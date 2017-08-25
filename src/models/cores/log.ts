import { BaseModel } from "../base/base-model";
import { IBaseModel } from "../base/interface-base-model";
import { IDatabaseModel } from "../base/interface-database-model";
import { BaseDatabaseModel } from "../base/base-database-model";

export class Log extends BaseDatabaseModel implements IBaseModel, IDatabaseModel {

    public id: number;

    public message: string;

    public stackTrace: string;

    public body: string;

    public ip: string;

    public url: string;

    constructor(data?: any) {
        super(data);
    }

    public cast(data?: any) {
        this.id = data.id
        this.message = data.message;
        this.stackTrace = data.stackTrace;
        this.body = data.body;
        this.ip = data.ip;
        this.url = data.url;
    }
}
