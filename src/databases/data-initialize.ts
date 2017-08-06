import * as UserDBModel from "../databases/models/users";
import { User } from "../models/cores/user";
import { HashHelper } from "../helpers/hash-helper";

declare const Promise: any;

export class DataInitialize {

    private static userCount = 0;

    private static error: any;


    static init(): Promise<boolean> {

        return new Promise((resolve, reject) => {
            this.createUsersMock();
            this.isComplete(resolve, reject);
        });
    }

    static createUsersMock() {

        UserDBModel.findOne().then((data) => {
            if (!data) {
                this.createUser('Tak', '1234');
                this.createUser('Users', '1234');
            }
        });
    }

    private static createUser(username: string, password: string) {

        let user = new User({
            username: username,
            password: HashHelper.hashPassword(password),
            token: HashHelper.generateToken(),
            refreshToken: HashHelper.generateToken(),
            lastRefreshToken: new Date()
        });

        UserDBModel.create(user).then(() => {
            this.userCount++;
        }).catch((err) => {
            this.error = err;
        })
    }

    private static isComplete(resolve, reject) {

        setTimeout(() => {
            if (this.error) {
                reject(this.error);
            }
            else if (this.userCount == 2) {
                resolve();
            }
            else {
                this.isComplete(resolve, reject);
            }
        }, 500);

    }

}