"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable("customers", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrment: true,
                allowNull: false,
                primaryKey: true
            },
            fullName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            gender: {
                type: Sequelize.STRING(2),
                allowNull: false
            },
            birthDate: {
                type: Sequelize.STRING(10),
                allowNull: false
            },
            age: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            cityId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: "cities", key: "id" },
                onUpdate: "CASCADE",
                onDelete: "SET NULL"
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable("customers");
    }
};
