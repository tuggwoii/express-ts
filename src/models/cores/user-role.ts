import { BaseModel } from "../base/base-model";
import { IBaseModel } from "../base/interface-base-model";

export class UserRole extends BaseModel implements IBaseModel {

    public id: number;

    public userId: number;

    public roleId: number;

    constructor(data?: any) {
        super(data);
    }

    public cast(data?: any) {
        this.id = data.id
        this.userId = data.userId;
        this.roleId = data.roleId;
    }
}
