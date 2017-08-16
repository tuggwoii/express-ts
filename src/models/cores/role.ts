import { BaseModel } from "../base/base-model";
import { IBaseModel } from "../base/interface-base-model";

export class Role extends BaseModel implements IBaseModel {

    public id: number;

    public name: string;

    constructor(data?: any) {
        super(data);
    }

    public cast(data?: any) {
        this.id = data.id
        this.name = data.name;
    }
}
