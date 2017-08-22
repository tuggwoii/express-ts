import { BaseDBModel } from "./base-db-model";

export interface IDBModel<T> {

    create(t: T): Promise<any>

    findById(id: number): Promise<T>

    findOne(query?: any): Promise<T>

    findAll(query?: any): Promise<Array<T>>

    belongsTo(dbModel: BaseDBModel<any>, settings?: any): void;

    hasMany(dbModel: BaseDBModel<any>, settings?: any): void;
}