import { IDBModel } from "./base/interface-db-model";
import { DbContext } from "../database-connection";
import { Role } from "../../models/cores/role";

const sequelize = require('sequelize');

const rolesDBModel: IDBModel<Role> = DbContext.define('Roles', {
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

export { rolesDBModel as RolesDBModel }