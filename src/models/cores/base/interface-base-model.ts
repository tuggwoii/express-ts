export interface IBaseModel {

    cast(data?: any): void;

    toJSON(): JSON;

}