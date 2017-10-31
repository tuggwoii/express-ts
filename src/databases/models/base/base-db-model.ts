import { IDBModel } from "./interface-db-model";

export class BaseDBModel<T> implements IDBModel<T> {
   

    public hasMany(dbModel: BaseDBModel<any>, settings?: any): void {
       
    }

    public belongsTo(dbModel: BaseDBModel<any>, settings?: any): void {
       
    }

    public count(query?: any): Promise<number> {
        return Promise.resolve(0);
    }

    public async findById(id: number): Promise<T> {
        return Promise.resolve(null);
    }

    public async findOne(query?: any): Promise<T> {
        return Promise.resolve(null);
    }

    public async findAll(query?: any): Promise<Array<T>> {
        return Promise.resolve(null);
    }

    public async create(t: T): Promise<any> {
        return Promise.resolve();
    }
}