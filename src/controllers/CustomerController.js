const { StatusCodes } = require("http-status-codes");
const {
    City,
    Customer,
    Sequelize: { Op }
} = require("../models");

const register = async (req, res, next) => {
    try {
        const { cityId, fullName, gender, birthDate, age } = req.body;

        const city = await City.findByPk(cityId);
        if (!city) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "Nenhuma cidade encontrada"
            });
        } else {
            const customer = await Customer.create({
                fullName,
                gender,
                birthDate,
                age,
                cityId
            });

            const response = {
                ...customer.dataValues,
                city: await customer.getCity()
            };
            delete response.cityId;

            res.status(StatusCodes.CREATED).json(response);
        }
    } catch (error) {
        next(error);
    }
};

const findByName = async (req, res, next) => {
    try {
        const customers = await Customer.findAll({
            where: {
                fullName: {
                    [Op.like]: `%${req.params.name}%`
                }
            },
            include: { association: "city" },
            attributes: { exclude: ["cityId"] }
        });

        if (customers.length === 0) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: "Nenhum cliente encontrado"
            });
        } else {
            res.status(StatusCodes.OK).json(customers);
        }
    } catch (error) {
        next(error);
    }
};

const findById = async (req, res, next) => {
    try {
        const customer = await Customer.findByPk(req.params.id, {
            include: { association: "city" },
            attributes: { exclude: ["cityId"] }
        });

        if (!customer) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: "Nenhum cliente encontrado"
            });
        } else {
            res.status(StatusCodes.OK).json(customer);
        }
    } catch (error) {
        next(error);
    }
};

const changeName = async (req, res, next) => {
    try {
        const customer = await Customer.findByPk(req.params.id, {
            include: { association: "city" }
        });

        if (!customer) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: "Nenhum cliente encontrado"
            });
        } else {
            customer.fullName = req.body.fullName;
            await customer.save();

            res.status(StatusCodes.OK).json(customer);
        }
    } catch (error) {
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const deletedCustomersNumber = await Customer.destroy({
            where: { id: req.params.id }
        });

        if (deletedCustomersNumber < 1) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: "Nenhum cliente encontrado"
            });
        } else {
            res.status(StatusCodes.OK).json({
                message: "Cliente deletado com sucesso"
            });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    findByName,
    findById,
    changeName,
    remove
};
