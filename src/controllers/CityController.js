const { StatusCodes } = require("http-status-codes");
const {
    City,
    Sequelize: { Op }
} = require("../models");

const register = async (req, res, next) => {
    try {
        const { name, state } = req.body;
        const city = await City.create({
            name: name,
            state: state ? state.toUpperCase() : state
        });
        res.status(StatusCodes.CREATED).json(city);
    } catch (error) {
        next(error);
    }
};

const findByName = async (req, res, next) => {
    try {
        const cities = await City.findAll({
            where: {
                name: {
                    [Op.like]: `%${req.params.name.toLowerCase()}%`
                }
            }
        });

        if (cities.length === 0) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: "Nenhuma cidade encontrada"
            });
        } else {
            res.status(StatusCodes.OK).json(cities);
        }
    } catch (error) {
        next(error);
    }
};

const findByState = async (req, res, next) => {
    try {
        const cities = await City.findAll({
            where: {
                state: {
                    [Op.like]: `%${req.params.state.toUpperCase()}%`
                }
            }
        });

        if (cities.length === 0) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: "Nenhuma cidade encontrada"
            });
        } else {
            res.status(StatusCodes.OK).json(cities);
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    findByName,
    findByState
};
