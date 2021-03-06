const Sequelize = require('sequelize');
const sequelize = require('../utils/database.js');

const Squad = sequelize.define('squad', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    capacity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    numMembers: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    rendezvous: {
        type: Sequelize.STRING,
        allowNull: false
    },
    destination: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dateTime: {
        type: Sequelize.DATE,
        allowNull: false
    },
});

module.exports = Squad;