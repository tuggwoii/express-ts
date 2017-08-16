export interface IDBModel<T> {

    create(t: T): Promise<any>

    findById(id: number): Promise<T>

    findOne(query?: any): Promise<T>

    findAll(query?: any): Promise<Array<T>>

}