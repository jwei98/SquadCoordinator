const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const LineupItem = sequelize.define('lineupItem', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }
});

module.exports = LineupItem;