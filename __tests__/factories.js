const faker = require("faker");
const moment = require("moment");
const { factory } = require("factory-girl");
const { City, Customer } = require("../src/models");
const { genders, states } = require("../src/config/enums");

faker.locale = "pt_BR";

factory.define("City", City, {
    name: faker.address.cityName(),
    state: faker.random.arrayElement(states)
});

factory.define("Customer", Customer, async () => {
    return {
        fullName: `${faker.name.firstName()} + ${faker.name.lastName()}`,
        gender: faker.random.arrayElement(genders),
        birthDate: moment(
            faker.date.between("1920-01-01", "2021-01-01")
        ).format("YYYY-MM-DD"),
        age: faker.datatype.number({ min: 0, max: 100 })
    };
});

module.exports = factory;
