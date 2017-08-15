export interface IBaseModel {

    cast(data?: any): void;

    toJSON(): any;

    isValid(): Promise<Array<string>|any>
}