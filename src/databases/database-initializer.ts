import { UsersDBModel } from "../databases/models/users";
import { RolesDBModel } from "../databases/models/roles";
import { UserRolesDBModel } from "../databases/models/user-roles";
import { User } from "../models/cores/user";
import { Role } from "../models/cores/role";
import { UserRole } from "../models/cores/user-role";
import { HashHelper } from "../helpers/hash-helper";
import { RoleTypes } from "../models/cores/role-types";

declare const Promise: any;

export class DatabaseInitializer {

    static init(): Promise<boolean> {

        return new Promise((resolve, reject) => {
            return (async () => {
                try {
                    await this.createMocks();
                    resolve(true);
                }
                catch (err) {
                    reject(err);
                }
            })();
        });
    }

    static async createMocks(): Promise<any> {

        return new Promise((resolve, reject) => {
            return (async () => {
                await this.createUsersMock();
                await this.createRoleMock();
                await this.createUserRolesMock();
                resolve();
            })();
        });
    }

    static async createUsersMock(): Promise<any> {

        return new Promise((resolve) => {
         
            UsersDBModel.findOne().then((data) => {
                if (!data) {
                    return (async () => {
                        await this.createUser('Tak', '1234');
                        await this.createUser('Users', '1234');
                        resolve();
                    })();  
                }
                else {
                    resolve();
                }
            }).catch((err) => {
                throw err;
            });
        });

    }

    private static async createRoleMock(): Promise<any>  {
        return new Promise((resolve) => {
            RolesDBModel.findOne().then((data) => {
                if (!data) {
                    return (async () => {
                        await this.createRole(RoleTypes.Administrator);
                        await this.createRole(RoleTypes.User);
                        resolve();
                    })();  
                }
                else {
                    resolve();
                }
            }).catch((err) => {
                throw err;
            })
        });
    }

    private static async createUserRolesMock(): Promise<any> {
        return new Promise((resolve) => {
            UserRolesDBModel.findOne().then((data) => {
                if (!data) {
                    return (async () => {
                        await this.assignRoleToUser('Tak', RoleTypes.Administrator);
                        await this.assignRoleToUser('Tak', RoleTypes.User);
                        await this.assignRoleToUser('Users', RoleTypes.User);
                        resolve();
                    })();  
                }
                else {
                    resolve();
                }
            }).catch((err) => {
                throw err;
            })
        });
    }

    private static async createUser(username: string, password: string): Promise<any> {

        return new Promise((resolve) => {

            let user = new User({
                username: username,
                password: HashHelper.hashPassword(password),
                token: HashHelper.generateToken(),
                refreshToken: HashHelper.generateToken(),
                lastRefreshToken: new Date()
            });

            UsersDBModel.create(user).then(() => {
                resolve()
            }).catch((err) => {
                throw err;
            })
        });
    }

    private static async createRole(roleName: string): Promise<any> {
        return new Promise((resolve) => {

            let role = new Role({
                name: roleName
            });

            return RolesDBModel.create(role).then(() => {
                resolve();
            }).catch((err) => {
                throw err;
            })
        });
    }

    private static async assignRoleToUser(userName: string, roleName: string): Promise<any> {
        return new Promise((resolve) => {
            return (async () => {
                let user = await UsersDBModel.findOne({
                    where: { username: userName }
                });

                let role = await RolesDBModel.findOne({
                    where: { name: roleName }
                });
               
                if (user && role) {

                    let userRole = new UserRole({
                        roleId: role.id,
                        userId: user.id
                    });

                    UserRolesDBModel.create(userRole).then(() => {
                        resolve();
                    }).catch((err) => {
                        throw err;
                    });
                }
                else {
                    throw new Error('user/role not found')
                }
            })()
        });
    }
}