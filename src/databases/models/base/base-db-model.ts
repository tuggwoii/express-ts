import { IDBModel } from "./interface-db-model";

export class BaseDBModel<T> implements IDBModel<T> {

    public async findOne(query?: any): Promise<T> {
        return Promise.resolve(null);
    }

    public async create(t: T): Promise<any> {
        return Promise.resolve();
    }

}