import { IDBModel } from "../databases/models/base/interface-db-model";

export interface IBaseService<T> {
    
    GetOne(query?: any): Promise<T>

    GetAll(query?: any): Promise<Array<T>>
}