import * as AuthenticationsDBModel from "../databases/models/authentication";
import { Authentication } from "../models/cores/authentication";

declare const Promise: any;

export class DataInitialize {

    static init(): Promise<boolean> {

        return new Promise((resolve, reject) => {
            this.createAuthenticationMock(resolve, reject);
        });
    } 

    static createAuthenticationMock(resolve, reject) {

        AuthenticationsDBModel.findOne().then((data) => {
            if (!data) {

            }
            console.log(new Authentication(data));
            resolve();
        });

    }
}