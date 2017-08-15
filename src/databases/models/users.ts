import * as Sequelize from "../database";
import { User } from "../../models/cores/user";
import { BaseDBModel } from "./base/base-db-model";

const sequelize = require('sequelize');

const UsersDBModel: BaseDBModel<User> = Sequelize.define('Users', {
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