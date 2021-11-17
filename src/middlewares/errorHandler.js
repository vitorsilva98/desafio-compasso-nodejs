const { StatusCodes } = require("http-status-codes");

module.exports = (app) => {
    const handle = (err, req, res, next) => {
        if (err.errors) {
            const details = err.errors.reduce((final, error) => {
                final[error.path] = error.message;
                return final;
            }, {});

            res.status(StatusCodes.BAD_REQUEST).json({
                message: "Dados inválidos",
                details
            });
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Ocorreu um erro. Tente novamente"
            });
        }
    };

    app.use(handle);
};
