const router = require("express").Router();
const CityController = require("../controllers/CityController");

module.exports = (app) => {
    router.post("/", CityController.register);
    router.get("/findByName/:name", CityController.findByName);
    router.get("/findByState/:state", CityController.findByState);

    app.use("/cities", router);
};
