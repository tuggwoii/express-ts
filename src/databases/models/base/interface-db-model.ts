export interface IDBModel<T> {

    create(t: T): Promise<any>

    findOne(query?: any): Promise<T>;

}