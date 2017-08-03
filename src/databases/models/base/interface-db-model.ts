export interface IDBModel<T> {

    create(t: T): Promise<any>

    findOne(): Promise<T>;

}