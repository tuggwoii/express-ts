import { HashHelper } from "../helpers/hash-helper";
import { BaseService } from "./base-service";
import { IBaseService } from "./interface-base-service";
import { User } from "../models/cores/user";
import { UsersDBModel } from "../databases/database-context";
import { UserRolesDBModel } from "../databases/database-context";
import { RolesDBModel } from "../databases/database-context";

class UserService extends BaseService<User> implements IBaseService<User> {

    constructor() {
        super(UsersDBModel);
    }

    public GetUserById(id: number): Promise<User> {
        return new Promise((resolve, reject) => {
            UsersDBModel.findById(id).then((user) => {
                if (user) {
                    resolve(user);
                }
                else {
                    resolve(null);
                }
            }).catch((err) => {
                reject(err);
            })
        });
    }

    public GetUserByIdWithRoles(id: number): Promise<User> {
        return new Promise((resolve, reject) => {
            this.GetOne({
                where: {
                    id: id
                },
                include: [
                    {
                        model: UserRolesDBModel,
                        as: 'roles',
                        include: [
                            {
                                model: RolesDBModel,
                                as: 'role'
                            }
                        ]
                    }
                ]
            }).then((user) => {
                if (user) {
                    resolve(user);
                }
                else {
                    resolve(null);
                }
            }).catch((err) => {
                reject(err);
            })
        });
    }

    public GetUserByToken(token: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.GetOne({
                where: {
                    $or: [
                        { token: token },
                        { refreshToken: token }
                    ]
                },
                include: [
                    {
                        model: UserRolesDBModel,
                        as: 'roles',
                        include: [
                            {
                                model: RolesDBModel,
                                as: 'role'
                            }
                        ]
                    }
                ]
            }).then((user) => {
                if (user) {
                    resolve(user);
                }
                else {
                    resolve(null);
                }
            }).catch((err) => {
                reject(err);
            })
        });
    }

    public RollToken(id: number): Promise<User> {
        return new Promise((resolve, reject) => {
            (async () => {
                let user = await this.GetOne({ where: { id: id } });
                if (user) {
                    let newToken = await this.generateRefreshToken();
                    user.update({
                        token: user.refreshToken,
                        refreshToken: newToken,
                        lastRefreshToken: new Date()
                    }).then((result) => {
                        (async () => {
                            let user = await this.GetUserByIdWithRoles(result.id);
                            resolve(user);
                        })().catch((err) => {
                            reject(err);
                        });
                    }).catch((err) => {
                        reject(err);
                    })
                }
                else {
                    reject(new Error('user not found'));
                }
            })()
        });
    }

    private generateRefreshToken(): Promise<string> {
        return new Promise((resolve, reject) => {
            let token = HashHelper.generateToken();
            (async () => {
                let user = await this.GetUserByToken(token);
                if (!user) {
                    resolve(token);
                }
                else {
                    return this.generateRefreshToken();
                }
            })()
        });
    }
}

let userService = new UserService();

export = userService;
