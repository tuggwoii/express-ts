import { BaseModel } from "../base/base-model";
import { IBaseModel } from "../base/interface-base-model";
import { Role } from "./role";

export class UserRole extends BaseModel implements IBaseModel {

    public id: number;

    public userId: number;

    public roleId: number;

    public role: Role;

    constructor(data?: any) {
        super(data);
    }

    public cast(data?: any) {
        this.id = data.id
        this.userId = data.userId;
        this.roleId = data.roleId;
        if (data.role) {
            this.role = data.role
        }
    }
}
