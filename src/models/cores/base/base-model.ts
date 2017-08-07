import { IBaseModel } from "./interface-base-model";

declare const Promise: any;

export class BaseModel implements IBaseModel {

    isValid(): Promise<Array<string>> {
        return new Promise((resolve, reject) => {
            resolve([]);
        });
    }

    constructor(data?: any) {
        if (data) {
            this.cast(data);
        }
    }

    cast(data: any): void {
       
    }

    toJSON(): any {
        let data: any = {};
        for (let i in this) {
            if (typeof this[i] != 'function') {
                data[i] = this[i];
            }
        }
        return JSON.parse(JSON.stringify(data));
    }
}