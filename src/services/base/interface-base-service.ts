import { IDBModel } from "../../databases/models/base/interface-db-model";

export interface IBaseService<T> {
    
    getOne(query?: any): Promise<T>

    getAll(query?: any): Promise<Array<T>>

    count(query?: any): Promise<number>
}