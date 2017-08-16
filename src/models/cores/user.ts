import { BaseModel } from "../base/base-model";
import { IBaseModel } from "../base/interface-base-model";

export class User extends BaseModel implements IBaseModel {

    public id: number;

    public username: string;

    public password: string;

    public token: string;

    public refreshToken: string;

    public lastRefreshToken: Date;

    constructor(data?: any) {
        super(data);
    }

    public cast(data?: any) {
        this.id = data.id
        this.username = data.username;
        this.password = data.password;
        this.token = data.token;
        this.refreshToken = data.refreshToken;
        if (data.lastRefreshToken) {
            this.lastRefreshToken = new Date(data.lastRefreshToken);
        }
    }
}
