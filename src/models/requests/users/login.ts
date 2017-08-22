import { IBaseModel } from "../../base/interface-base-model";
import { BaseModel } from "../../base/base-model";
import { User } from "../../cores/user";
import { HashHelper } from "../../../helpers/hash-helper";
import * as UsersDBModel from "../../../databases/models/users";

declare const Promise: any;

export class Login extends BaseModel implements IBaseModel {

    public username: string;

    public password: string;

    constructor(data?: any) {
        super(data);
    }

    public cast(data?: any) {
        this.username = data.username? data.username.trim() : '';
        this.password = data.password? data.password.trim() : '';
    }

    public isValid(): Promise<Array<string>|User> {
        return new Promise((resolve, reject) => {
            let errs = [];

            if (!this.username) {
                errs.push('username is required');
            }
            if (!this.password) {
                errs.push('password is required');
            }
            if (this.username && this.password) {
                (async () => {
                    let result = await UsersDBModel.findOne({ where: { username: this.username } })
                    if (result) {
                        let user = new User(result);
                        let isPasswordValid = HashHelper.comparePassword(this.password, user.password);
                        if (isPasswordValid) {
                            resolve(user);
                        }
                        else {
                            errs.push('credentials is invalid');
                            reject(errs);
                        }
                    }
                    else {
                        errs.push('credentials is invalid');
                        reject(errs);
                    }
                })();
            }
            else {
                reject(errs);
            }
        });
    }
}  
