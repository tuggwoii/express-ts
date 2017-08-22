import { Environment } from "../configs/environment";

const Sequelize = require('sequelize');
const env: string = process.env.NODE_ENV || Environment.DEV;
const configs: any = require('../configs/database-config.json')[env];

const sequelize = new Sequelize(configs.database, configs.username, configs.password, {
    host: configs.host,
    dialect: configs.dialect,
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    },
    dialectOptions: {
        encrypt: true
    },
    omitNull: true,
    logging: false
});

export = sequelize;
