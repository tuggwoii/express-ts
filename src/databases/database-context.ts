import { UsersDBModel } from "./models/users";
import { UserRolesDBModel } from "./models/user-roles";
import { RolesDBModel } from "./models/roles";
import { LogsDBModel } from "./models/logs";

UsersDBModel.hasMany(UserRolesDBModel, { as: 'roles' });
RolesDBModel.hasMany(UserRolesDBModel);
UserRolesDBModel.belongsTo(UsersDBModel, { as: 'roles', foreignKey: 'userId' });
UserRolesDBModel.belongsTo(RolesDBModel, { as: 'role', foreignKey: 'roleId' });

export {
    UsersDBModel as UsersDBModel,
    UserRolesDBModel as UserRolesDBModel,
    RolesDBModel as RolesDBModel,
    LogsDBModel as LogsDBModel
}