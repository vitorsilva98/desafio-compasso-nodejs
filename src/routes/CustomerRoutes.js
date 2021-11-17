const router = require("express").Router();
const CustomerController = require("../controllers/CustomerController");

module.exports = (app) => {
    router.post("/", CustomerController.register);
    router.get("/:id", CustomerController.findById);
    router.get("/findByName/:name", CustomerController.findByName);
    router.patch("/:id", CustomerController.changeName);
    router.delete("/:id", CustomerController.remove);

    app.use("/customers", router);
};
