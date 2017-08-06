import * as Sequelize from "../database";
import { IDBModel } from "./base/interface-db-model";
import { User } from "../../models/cores/user";

const sequelize = require('sequelize');

const UsersDBModel: IDBModel<User> = Sequelize.define('Users', {
    id: {
        field: 'Id',
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        field: 'Username',
        type: sequelize.STRING(200),
        allowNull: false
    },
    password: {
        field: 'Password',
        type: sequelize.STRING(200),
        allowNull: true
    },
    token: {
        field: 'Token',
        type: sequelize.STRING(1000),
        allowNull: true
    },
    refreshToken: {
        field: 'RefreshToken',
        type: sequelize.STRING(1000),
        allowNull: true
    },
    lastRefreshToken: {
        field: 'LastRefreshToken',
        type: sequelize.DATE,
        allowNull: true
    }
});

export = UsersDBModel;