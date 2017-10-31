import { DbContext } from "../database-connection";
import { IDBModel } from "./base/interface-db-model";
import { UserRole } from "../../models/cores/user-role";

const sequelize = require('sequelize');

const userRolesDBModel: IDBModel<UserRole> = DbContext.define('UserRoles', {
    id: {
        field: 'Id',
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        field: 'UserId',
        type: sequelize.INTEGER,
        allowNull: false
    },
    roleId: {
        field: 'RoleId',
        type: sequelize.INTEGER,
        allowNull: false
    }
});

export { userRolesDBModel as UserRolesDBModel };