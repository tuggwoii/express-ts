import { User } from "../models/cores/user";
import * as UsersDBModel from "../databases/models/users";
import { HashHelper } from "../helpers/hash-helper";

class UserService {

    public GetUserById(id: number): Promise<User> {

        return new Promise((resolve, reject) => {
            UsersDBModel.findById(id).then((user) => {
                if (user) {
                    resolve(new User(user))
                }
                else {
                    resolve(null)
                }
            }).catch((err) => {
                reject(err);
            })
        });
    }

    public GetUserByToken(token: string): Promise<User> {

        return new Promise((resolve, reject) => {
            this.QueryOne({
                where: {
                    $or: [
                        { token: token },
                        { refreshToken: token }
                    ]
                }
            }).then((user) => {
                if (user) {
                    resolve(new User(user))
                }
                else {
                    resolve(null)
                }
            }).catch((err) => {
                reject(err);
            })
        });
    }

    public RollToken(id: number): Promise<User> {

        return new Promise((resolve, reject) => {

            (async () => {

                let user = await this.QueryOne({ where: { id: id } });

                if (user) {

                    let newToken = await this.recursiveGenerateRefreshToken();

                    user.update({
                        token: user.refreshToken,
                        refreshToken: newToken,
                        lastRefreshToken: new Date()
                    }).then((result) => {
                        resolve(new User(result))
                    }).catch((err) => {
                        reject(err)
                    })
                }

            })();

        });
    }

    private recursiveGenerateRefreshToken(): Promise<string> {
        return new Promise((resolve, reject) => {

            let token = HashHelper.generateToken();

            (async () => {
                let user = await this.GetUserByToken(token);
                if (!user) {
                    resolve(token);
                }
                else {
                    return this.recursiveGenerateRefreshToken()
                }
            })();

        });
    }

    private QueryOne(query?: any): Promise<any> {
        return UsersDBModel.findOne(query);
    }

    private QueryAll(query?: any): Promise<any> {
        return UsersDBModel.findAll(query);
    }
}

let userService = new UserService();

export = userService;
