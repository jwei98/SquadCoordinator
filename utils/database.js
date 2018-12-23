const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    database: 'flight_coordinator',
    host: 'localhost',
    username: 'root',
    password: '',
    dialect: 'mysql',
    operatorsAliases: false,
    logging: false
});

module.exports = sequelize;