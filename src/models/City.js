const { states } = require("../config/enums");

module.exports = (sequelize, DataTypes) => {
    const City = sequelize.define("City", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Nome da cidade não pode ser nulo"
                },
                notEmpty: {
                    msg: "Nome da cidade não pode ser vazio"
                }
            }
        },
        state: {
            type: DataTypes.STRING(2),
            allowNull: false,
            validate: {
                isIn: {
                    args: [states],
                    msg: `Nome do estado inválido. Lista de valores válidos: ${states.join(
                        ", "
                    )}`
                }
            }
        }
    });

    City.associate = function (models) {
        City.hasMany(models.Customer, {
            foreignKey: "cityId",
            as: "redidents"
        });
    };

    return City;
};
