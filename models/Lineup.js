const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Lineup = sequelize.define('lineup', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }
});

module.exports = Lineup;