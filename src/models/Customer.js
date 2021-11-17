const { genders } = require("../config/enums");
const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define("Customer", {
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Nome do cliente não pode ser nulo"
                },
                notEmpty: {
                    msg: "Nome do cliente não pode ser vazio"
                }
            }
        },
        gender: {
            type: DataTypes.STRING(2),
            allowNull: false,
            validate: {
                isIn: {
                    args: [genders],
                    msg: `Sexo inválido. Lista de valores válidos: ${genders.join(
                        ", "
                    )}`
                }
            }
        },
        birthDate: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Data de nascimento não pode ser nulo"
                },
                notEmpty: {
                    msg: "Data de nascimento não pode ser vazio"
                },
                isValidDate(value) {
                    const date = moment(value, "YYYY-MM-DD", true);
                    if (date.isValid()) {
                        if (date.isAfter(moment())) {
                            throw new Error(
                                "Data de nascimento deve ser menor que a data atual"
                            );
                        }
                    } else {
                        throw new Error(
                            "Data de nascimento deve estar no formato YYYY-MM-DD"
                        );
                    }
                }
            }
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: {
                    args: [0],
                    msg: "Idade deve ser maior que zero"
                }
            }
        }
    });

    Customer.associate = function (models) {
        Customer.belongsTo(models.City, { foreignKey: "cityId", as: "city" });
    };

    return Customer;
};
