import * as UsersDBModel from "./models/users";
import * as UserRolesDBModel from "./models/user-roles";
import * as RolesDBModel from "./models/roles";

UsersDBModel.hasMany(UserRolesDBModel, { as: 'roles' });
RolesDBModel.hasMany(UserRolesDBModel);
UserRolesDBModel.belongsTo(UsersDBModel, { as: 'roles', foreignKey: 'userId' });
UserRolesDBModel.belongsTo(RolesDBModel, { as: 'role', foreignKey: 'roleId' });

export {
    UsersDBModel as UsersDBModel,
    UserRolesDBModel as UserRolesDBModel,
    RolesDBModel as RolesDBModel
}