export interface IDatabaseModel {

    update(properties: object): Promise<any>
}