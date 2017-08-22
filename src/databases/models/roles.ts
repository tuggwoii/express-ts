import * as Sequelize from "../database-connection";
import { IDBModel } from "./base/interface-db-model";
import { Role } from "../../models/cores/role";

const sequelize = require('sequelize');

const RolesDBModel: IDBModel<Role> = Sequelize.define('Roles', {
    id: {
        field: 'Id',
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        field: 'Name',
        type: sequelize.STRING(200),
        allowNull: false
    }
});

export = RolesDBModel;