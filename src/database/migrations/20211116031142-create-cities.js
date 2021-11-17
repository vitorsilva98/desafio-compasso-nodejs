"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable("cities", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrment: true,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            state: {
                type: Sequelize.STRING(2),
                allowNull: false
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable("cities");
    }
};
