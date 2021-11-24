"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
describe('GET CUSTOMERS', () => {
    test('should get all customers and return 200 as status', async () => {
        const res = await (0, supertest_1.default)(app_1.default).get('/');
        expect(res.statusCode).toEqual(200);
    });
    test('should return 200 status for a single Customer', async () => {
        const res = await (await (0, supertest_1.default)(app_1.default).get('/1'));
        expect(res.statusCode).toEqual(200);
    });
});
describe('POST CUSTOMER', () => {
    test('return status code 201 if customer data is passed correctly ', async () => {
        await (0, supertest_1.default)(app_1.default).post('/').send({
            "author": "mary Dawn",
            "age": 28,
            "address": "5, Wall Street, Buckingham",
            "books": [
                {
                    "name": "Tomorrow is coming",
                    "isPublished": true,
                    "datePublished": 1637159508581,
                    "serialNumber": 10
                },
                {
                    "name": "Octobers very own",
                    "isPublished": false,
                    "datePublished": null,
                    "serialNumber": null
                }
            ]
        }).set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201);
    });
    test('should return bad request if some data is missing', async () => {
        const res = await (0, supertest_1.default)(app_1.default).post('/authors').send({
            author: "mary Dawn",
            address: "5, Wall Street, Buckingham",
            books: [
                {
                    "name": "Tomorrow is coming",
                    "isPublished": true,
                    "datePublished": 1637159508581,
                    "serialNumber": 10
                },
                {
                    "name": "Octobers very own",
                    "isPublished": false,
                    "datePublished": null,
                    "serialNumber": null
                }
            ]
        });
        expect(res.statusCode).toEqual(400);
    });
});
