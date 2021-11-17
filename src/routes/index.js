module.exports = (app) => {
    require("./CityRoutes")(app);
    require("./CustomerRoutes")(app);
};
