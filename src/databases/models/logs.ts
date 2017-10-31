import { DbContext } from "../database-connection";
import { BaseDBModel } from "./base/base-db-model";
import { Log } from "../../models/cores/log";

const sequelize = require('sequelize');

const logsDBModel: BaseDBModel<Log> = DbContext.define('Logs', {
    id: {
        field: 'Id',
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    message: {
        field: 'Message',
        type: sequelize.STRING(4000),
        allowNull: false
    },
    stackTrace: {
        field: 'StackTrace',
        type: sequelize.STRING(4000),
        allowNull: true
    },
    body: {
        field: 'Body',
        type: sequelize.STRING(4000),
        allowNull: true
    },
    ip: {
        field: 'IP',
        type: sequelize.STRING(30),
        allowNull: false
    },
    url: {
        field: 'Url',
        type: sequelize.STRING(500),
        allowNull: false
    },
    status: {
        field: 'Status',
        type: sequelize.INTEGER,
        allowNull: false
    }
});

export { logsDBModel as LogsDBModel };