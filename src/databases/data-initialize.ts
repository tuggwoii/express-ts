import * as UserDBModel from "../databases/models/users";
import * as RolesDBModel from "../databases/models/roles";
import * as UserRolesDBModel from "../databases/models/user-roles";
import { User } from "../models/cores/user";
import { Role } from "../models/cores/role";
import { UserRole } from "../models/cores/user-role";
import { HashHelper } from "../helpers/hash-helper";
import { RoleTypes } from "../models/cores/role-types";

declare const Promise: any;

export class DataInitialize {

    private static userCount = 0;

    private static expectedUserCount = 2;

    private static roleCount = 0;

    private static expectedRoleCount = 2;

    private static userRolesCount = 0;

    private static expectedUserRolesCount = 3;

    private static isUserCompleted: boolean = false;

    private static isRoleCompleted: boolean = false;

    private static isUserRolesCompleted: boolean = false;

    private static isCompleted: boolean;

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
            else {
                this.isUserCompleted = true;
                this.isAllCompleted();
            }
        });

        RolesDBModel.findOne().then((data) => {
            if (!data) {
                this.createRole(RoleTypes.Administrator);
                this.createRole(RoleTypes.User);
            }
            else {
                this.isRoleCompleted = true;
                this.isAllCompleted();
            }
        });

        UserRolesDBModel.findOne().then((data) => {
            if (!data) {
                this.assignRoleToUser('Tak', RoleTypes.Administrator);
                this.assignRoleToUser('Tak', RoleTypes.User);
                this.assignRoleToUser('Users', RoleTypes.User);
            }
            else {
                this.isUserRolesCompleted = true;
                this.isAllCompleted();
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
            if (this.userCount == this.expectedUserCount) {
                this.isUserCompleted = true;
                this.isAllCompleted();
            }
        }).catch((err) => {
            this.error = err;
        })
    }

    private static createRole(roleName: string) {

        let role = new Role({
            name: roleName
        });

        RolesDBModel.create(role).then(() => {
            this.roleCount++;
            if (this.roleCount == this.expectedRoleCount) {
                this.isRoleCompleted = true;
                this.isAllCompleted();
            }
        }).catch((err) => {
            this.error = err;
        });
    }

    private static assignRoleToUser(userName: string, roleName: string) {
        UserDBModel.findOne({
            where: { username: userName }
        }).then((_user) => {
            if (_user) {

                let user = new User(_user);

                return RolesDBModel.findOne({
                    where: { name: roleName }
                }).then((_role) => {
                    if (_role) {
                        let role = new User(_role);

                        let userRole = new UserRole({
                            roleId: role.id,
                            userId: user.id
                        });

                        return UserRolesDBModel.create(userRole).then(() => {
                            this.userRolesCount++
                            if (this.userRolesCount == this.expectedUserRolesCount) {
                                this.isUserRolesCompleted = true;
                                this.isAllCompleted();
                            }
                        }).catch((err) => {
                            this.error = err;
                        })
                    }
                    else {
                        this.error = 'role not found';
                    }
                }).catch((err) => {
                    this.error = err;
                })
            }
            else {
                this.error = 'user not found';
            }
        }).catch((err) => {
            this.error = err;
        });
    }

    private static isComplete(resolve, reject) {

        setTimeout(() => {
            if (this.error) {
                reject(this.error);
            }
            else if (this.isCompleted) {
                resolve();
            }
            else {
                this.isComplete(resolve, reject);
            }
        }, 500);

    }

    private static isAllCompleted() {

        if (this.isUserCompleted && this.isRoleCompleted && this.isUserRolesCompleted) {
            this.isCompleted = true;
        }

        return this.isCompleted;
    }

}