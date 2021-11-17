const { StatusCodes } = require("http-status-codes");
const request = require("supertest");
const moment = require("moment");

const factory = require("./factories");
const app = require("../src/app");
const { sequelize } = require("../src/models");

describe("Services", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    it("should create customer with valid credentials", async () => {
        const customer = await factory.create("Customer");
        const city = await factory.create("City");

        const response = await request(app).post("/customers").send({
            fullName: customer.fullName,
            gender: customer.gender,
            birthDate: customer.birthDate,
            age: customer.age,
            cityId: city.id
        });

        expect(response.status).toBe(StatusCodes.CREATED);
    });

    it("shouldn't create customer with invalid fullName", async () => {
        const customer = await factory.create("Customer");
        const city = await factory.create("City");

        const response = await request(app).post("/customers").send({
            fullName: "",
            gender: customer.gender,
            birthDate: customer.birthDate,
            age: customer.age,
            cityId: city.id
        });

        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty("details.fullName");
    });

    it("shouldn't create customer with invalid gender", async () => {
        const customer = await factory.create("Customer");
        const city = await factory.create("City");

        const response = await request(app).post("/customers").send({
            fullName: customer.fullName,
            gender: "A",
            birthDate: customer.birthDate,
            age: customer.age,
            cityId: city.id
        });

        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty("details.gender");
    });

    it("shouldn't create customer with invalid birthDate format", async () => {
        const customer = await factory.create("Customer");
        const city = await factory.create("City");

        const response = await request(app).post("/customers").send({
            fullName: customer.fullName,
            gender: customer.gender,
            birthDate: "08/11/1998",
            age: customer.age,
            cityId: city.id
        });

        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty("details.birthDate");
    });

    it("shouldn't create customer with birthDate above the current date", async () => {
        const customer = await factory.create("Customer");
        const city = await factory.create("City");

        const response = await request(app)
            .post("/customers")
            .send({
                fullName: customer.fullName,
                gender: customer.gender,
                birthDate: moment().add(3, "days").format("YYYY-MM-DD"),
                age: customer.age,
                cityId: city.id
            });

        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty("details.birthDate");
    });

    it("shouldn't create customer with invalid age", async () => {
        const customer = await factory.create("Customer");
        const city = await factory.create("City");

        const response = await request(app).post("/customers").send({
            fullName: customer.fullName,
            gender: customer.gender,
            birthDate: customer.birthDate,
            age: null,
            cityId: city.id
        });

        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty("details.age");
    });

    it("shouldn't create customer with invalid cityId", async () => {
        const customer = await factory.create("Customer");

        const response = await request(app).post("/customers").send({
            fullName: customer.fullName,
            gender: customer.gender,
            birthDate: customer.birthDate,
            age: customer.age,
            cityId: null
        });

        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it("should find customer by fullName", async () => {
        const customer = await factory.create("Customer");

        const response = await request(app)
            .get(`/customers/findByName/${customer.fullName}`)
            .send();

        expect(response.status).toBe(StatusCodes.OK);
    });

    it("shouldn't find customer by fullName", async () => {
        const response = await request(app)
            .get("/customers/findByName/fakename")
            .send();

        expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });

    it("should find customer by id", async () => {
        const customer = await factory.create("Customer");

        const response = await request(app)
            .get(`/customers/${customer.id}`)
            .send();

        expect(response.status).toBe(StatusCodes.OK);
    });

    it("shouldn't find customer by id", async () => {
        const response = await request(app).get("/customers/1").send();

        expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });

    it("should find customer and change fullName", async () => {
        const customer = await factory.create("Customer");

        const response = await request(app)
            .patch(`/customers/${customer.id}`)
            .send({
                fullName: "fakename"
            });

        expect(response.status).toBe(StatusCodes.OK);
    });

    it("shouldn't find customer and change fullName", async () => {
        const response = await request(app).patch("/customers/1").send({
            fullName: "fakename"
        });

        expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });

    it("should find customer and delete", async () => {
        const customer = await factory.create("Customer");

        const response = await request(app)
            .delete(`/customers/${customer.id}`)
            .send();

        expect(response.status).toBe(StatusCodes.OK);
    });

    it("shouldn't find customer and delete", async () => {
        const response = await request(app).delete("/customers/1").send();

        expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });

    it("should create city with valid credentials", async () => {
        const city = await factory.create("City");

        const response = await request(app).post("/cities").send({
            name: city.name,
            state: city.state
        });

        expect(response.status).toBe(StatusCodes.CREATED);
    });

    it("shouldn't create city with invalid name", async () => {
        const city = await factory.create("City");

        const response = await request(app).post("/cities").send({
            name: "",
            state: city.state
        });

        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty("details.name");
    });

    it("shouldn't create city with invalid state", async () => {
        const city = await factory.create("City");

        const response = await request(app).post("/cities").send({
            name: city.name,
            state: "XY"
        });

        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty("details.state");
    });

    it("shouldn't create city with invalid state and invalid name", async () => {
        const response = await request(app).post("/cities").send({
            name: "",
            state: ""
        });

        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty("details.name");
        expect(response.body).toHaveProperty("details.state");
    });

    it("should find city by name", async () => {
        const city = await factory.create("City");

        const response = await request(app)
            .get(`/cities/findByName/${city.name}`)
            .send();

        expect(response.status).toBe(StatusCodes.OK);
    });

    it("shouldn't find city by name", async () => {
        const response = await request(app)
            .get("/cities/findByName/fakename")
            .send();

        expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });

    it("should find city by state", async () => {
        const city = await factory.create("City");

        const response = await request(app)
            .get(`/cities/findByState/${city.state}`)
            .send();

        expect(response.status).toBe(StatusCodes.OK);
    });

    it("shouldn't find city by state", async () => {
        const response = await request(app)
            .get("/cities/findByState/fakename")
            .send();

        expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
});
