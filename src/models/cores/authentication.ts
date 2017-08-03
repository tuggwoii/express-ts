import { IBaseModel } from "./base/interface-base-model";

export class Authentication implements IBaseModel {

    public id: number;

    public username: string;

    public password: string;

    public token: string;

    public refreshToken: string;

    constructor(data?: any) {
        if (data) {
            this.cast(data);
        }
    }

    public cast(data?: any) {
        this.id = data.id
        this.username = data.username;
        this.password = data.password;
        this.token = data.token;
        this.refreshToken = data.refreshToken;
    }
}