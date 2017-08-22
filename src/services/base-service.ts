import { IBaseService } from "./interface-base-service";
import { IDBModel } from "../databases/models/base/interface-db-model";
import { BaseDBModel } from "../databases/models/base/base-db-model";

export class BaseService<T> implements IBaseService<T> {

    private DbContext: any;

    public GetOne(query?: any): Promise<T> {
        return this.DbContext.findOne(query);
    }

    public GetAll(query?: any): Promise<Array<T>> {
        return this.DbContext.findAll(query);
    }

    constructor(dbContext: BaseDBModel<any>) {
        this.DbContext = dbContext;
    }

}