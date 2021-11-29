"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { request, response } from 'express'
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
//import { deleteCustomer } from '../src/controller/function'
describe('GET CUSTOMERS', () => {
    it('should return 200 status for all customers', async () => {
        const res = await (0, supertest_1.default)(app_1.default).get('/');
        expect(res.statusCode).toEqual(200);
    });
    it('should return 200 status for a single customer', async () => {
        const newCustomer = await (0, supertest_1.default)(app_1.default)
            .post('/').send({
            "fullname": "paul pogba",
            "email": "banney@example.com",
            "gender": "m",
            "phone": "+2347085647535",
            "address": "1, ranteoiihuuttut",
            "notes": "This Customer is owing 500,000 naira"
        });
        const oldCustomer = await (0, supertest_1.default)(app_1.default).get(`/${newCustomer.body.id}`);
        expect(oldCustomer.statusCode).toEqual(200);
    });
});
describe('POST CUSTOMERS', () => {
    it('return status code 200 if customer details is passed correctly ', async () => {
        const newCustomer = await (0, supertest_1.default)(app_1.default).post('/')
            .send({
            "fullname": "ursulayyyyyy",
            "email": "joel@example.com",
            "gender": "m",
            "phone": "+2347085647535",
            "address": "1, ranteoiihuuttut",
            "notes": "This Customer is owing 10k"
        });
        const anotherCustomer = await (0, supertest_1.default)(app_1.default).post('/')
            .send({
            "fullname": "upaulooo",
            "email": "joel@example.com",
            "gender": "m",
            "phone": "+2347085647535",
            "address": "1, ranteoiihuuttut",
            "notes": "This Customer is owing 10k"
        });
        expect(anotherCustomer.body.message).toEqual(`email already exist try another`);
    });
    it('should return bad request if some details are missing', async () => {
        const res = await (0, supertest_1.default)(app_1.default).post('/').send({
            "id": 1,
            "fullname": "ursulayyyyyy",
            "email": "john@example.com",
            // "gender": "m",
            "phone": "+2347085647535",
            "address": "1, ranteoiihuuttut",
            "notes": "This Customer is owing 10k"
        });
        expect(res.statusCode).toEqual(400);
    });
});
// describe('DELETE CUSTOMER', ()=> {
//     it('it responds with a message of Deleted', async ()=>{
//        const newCustomer = await supertest(app)
//        .post('/')
//        .send( {
//         "fullname": "yyryyyyy",
//         "email": "freeedda@example.com",
//         "gender": "m",
//         "phone": "+2347085647535",
//         "address": "1, ranteoiihuuttut",
//         "notes": "This Customer is owing 10k"
//      });
//     //  console.log(new);
//     const removedCustomer = await supertest(app).delete(`/${newCustomer.body.data.id}`);
//     expect(removedCustomer.body.message).toEqual(`customer deleted successfuly`)
//     })
// })
// describe('PUT CUSTOMER', ()=>{
//     it('it responds with an updated data', async ()=> {
//         const newCustomer = await supertest(app)
//         .post('/')
//         .send( {
//             "id": 1,
//             "fullname": "ursulayyyyyy",
//             "email": "john@example.com",
//             "gender": "m",
//             "phone": "+2347085647535",
//             "address": "1, ranteoiihuuttut",
//             "notes": "This Customer is owing 10k"
//          })
//         const updatedCustomer = await supertest(app)
//         .put(`/${newCustomer.body.data.id}`)
//         .send({email: "bond@example.com"})
//         expect(updatedCustomer.body.data.email).toBe("bond@example.com");
//         expect(updatedCustomer.body.data).toHaveProperty("id");
//         expect(updatedCustomer.statusCode).toBe(201)
//     })
// })
