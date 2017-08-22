import { BaseModel } from "../../base/base-model";
import { IBaseModel } from "../../base/interface-base-model";

export class SimpleUser extends BaseModel implements IBaseModel {

    public id: number

    public username: string

    constructor(data?: any) {
        super(data);
    }

    public cast(data: any) {
        this.id = data.id;
        this.username = data.username;
    }
}