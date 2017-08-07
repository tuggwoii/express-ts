import { IBaseModel } from "../cores/base/interface-base-model";
import { BaseModel } from "../cores/base/base-model";
import { User } from "../cores/user";
import * as UsersDBModel from "../../databases/models/users";
import { HashHelper } from "../../helpers/hash-helper";

declare const Promise: any;

export class Login extends BaseModel implements IBaseModel {

    public username: string;

    public password: string;

    constructor(data?: any) {
        super(data);
    }

    public cast(data?: any) {
        this.username = data.username ? data.username.trim() : '';
        this.password = data.password ? data.password.trim() : '';
    }

    public isValid(): Promise<Array<string>> {
        return new Promise((resolve, reject) => {
            let errs = [];

            if (!this.username) {
                errs.push('username is required');
            }
            if (!this.password) {
                errs.push('password is required');
            }
            if (this.username && this.password) {
                UsersDBModel.findOne({ where: { username: this.username } }).then((_user) => {
                    if (_user) {
                        let user = new User(_user);
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
                }).catch((err: Error) => {
                    errs.push(err.message + ": " + err.stack);
                    reject(errs);
                })
            }
            else {
                reject(errs);
            }
        });
    }
}  
