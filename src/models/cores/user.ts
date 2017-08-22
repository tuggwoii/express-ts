import { BaseModel } from "../base/base-model";
import { IBaseModel } from "../base/interface-base-model";
import { IDatabaseModel } from "../base/interface-database-model";
import { BaseDatabaseModel } from "../base/base-database-model";
import { UserRole } from "./user-role";

export class User extends BaseDatabaseModel implements IBaseModel, IDatabaseModel {
    
    public id: number;

    public username: string;

    public password: string;

    public token: string;

    public refreshToken: string;

    public lastRefreshToken: Date;

    public roles: Array<UserRole>

    constructor(data?: any) {
        super(data);
    }

    public cast(data?: any) {
        this.id = data.id
        this.username = data.username;
        this.password = data.password;
        this.token = data.token;
        this.refreshToken = data.refreshToken;
        this.roles = [];
        if (data.lastRefreshToken) {
            this.lastRefreshToken = new Date(data.lastRefreshToken);
        }
        if (data.roles && data.roles.length) {
            this.roles = data.roles;
        }
    }
}
