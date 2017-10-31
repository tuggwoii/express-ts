import { IBaseService } from "./interface-base-service";
import { IDBModel } from "../../databases/models/base/interface-db-model";
import { BaseDBModel } from "../../databases/models/base/base-db-model";

export class BaseService<T> implements IBaseService<T> {

    constructor(dbContext: BaseDBModel<any>) {
        this.DbContext = dbContext;
    }

    private DbContext: BaseDBModel<any>;

    public getOne(query?: any): Promise<T> {
        return this.DbContext.findOne(query);
    }

    public getAll(query?: any): Promise<Array<T>> {
        return this.DbContext.findAll(query);
    }

    public count(query?: any): Promise<number> {
        return this.DbContext.count(query);
    }

}