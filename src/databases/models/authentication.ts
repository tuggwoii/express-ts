import * as Sequelize from "../database";
import { IDBModel } from "./base/interface-db-model";
import { Authentication } from "../../models/cores/authentication";

const sequelize = require('sequelize');

const AuthenticationsDBModel: IDBModel<Authentication> = Sequelize.define('Authentications', {
    id: {
        field: 'Id',
        type: sequelize.INTEGER,
        primaryKey: true
    },
    username: {
        field: 'Username',
        type: sequelize.STRING(200)
    },
    password: {
        field: 'Password',
        type: sequelize.STRING(200)
    },
    token: {
        field: 'Token',
        type: sequelize.STRING(1000)
    },
    refreshToken: {
        field: 'RefreshToken',
        type: sequelize.STRING(1000)
    }
});

export = AuthenticationsDBModel;