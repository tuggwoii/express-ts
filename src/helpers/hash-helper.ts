import * as config from "../configs/config"

const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const algorithm = 'sha256';
const saltRounds = 10;
var randomString = require('shortid');

export class HashHelper {

    static hashPassword(password: string): string {

        var hash = bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds));

        return hash;
    }

    static comparePassword(password: string, hash: string): boolean {

        return bcrypt.compareSync(password, hash);
    }

    static generateToken(): string {

        let token = '';
        for (let i = 0; i < saltRounds; i++) {
            token += randomString.generate()
        }

        return token;
    }

    static encrypt(data: string) {
        var cipher = crypto.createCipher(algorithm, config.hashSecret);
        var crypted = cipher.update(data, 'utf8', 'hex')
        crypted += cipher.final('hex');
        return crypted;
    }

    static decrypt(hash: string): any {
        var decipher = crypto.createDecipher(algorithm, config.hashSecret)
        var data = decipher.update(hash, 'hex', 'utf8')
        data += decipher.final('utf8');
        return data;
    }
}