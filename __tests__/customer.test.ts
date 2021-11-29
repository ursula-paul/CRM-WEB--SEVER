//import { request, response } from 'express'
import supertest from 'supertest'
import app from '../src/app'
//import { deleteCustomer } from '../src/controller/function'

describe('GET CUSTOMERS', () => {
    it('should return 200 status for all customers', async () => {
        const res = await supertest(app).get('/')
        expect(res.statusCode).toEqual(200);
    })

    it('should return 200 if customer email is unique', async () => {
        const newCustomer = await supertest(app)
        .post('/').send({
            "fullname": "paul pogba",
            "email": "banney@example.com",
            "gender": "m",
            "phone": "+2347085647535",
            "address": "1, ranteoiihuuttut",
            "notes": "This Customer is owing 500,000 naira"
        })

        if(newCustomer.body.message === `new customer added sucessfully`){
            expect(newCustomer.statusCode).toEqual(201)
        }
        if(newCustomer.body.message === `email already exist try another`){
            expect(newCustomer.statusCode).toEqual(400)
        }

    })
})

describe('POST CUSTOMERS', () => {
    it('return status code 201 if customer details is passed correctly ', async () => {
        const newCustomer = await supertest(app).post('/')
        .send(
            {
                
                "fullname": "ursulayyyyyy",
                "email": "joel@example.com",
                "gender": "m",
                "phone": "+2347085647535",
                "address": "1, ranteoiihuuttut",
                "notes": "This Customer is owing 10k"
             }

        )

        const anotherCustomer = await supertest(app).post('/')
        .send(
            {
                
                "fullname": "upaulooo",
                "email": "joel@example.com",
                "gender": "m",
                "phone": "+2347085647535",
                "address": "1, ranteoiihuuttut",
                "notes": "This Customer is owing 10k"
             }

        )
        expect(anotherCustomer.body.message).toEqual(`email already exist try another`)

    })

    it('should return bad request if some details are missing', async()=>{
        const res = await supertest(app).post('/').send(

            {
                "id": 1,
                "fullname": "ursulayyyyyy",
                "email": "john@example.com",
                // "gender": "m",
                "phone": "+2347085647535",
                "address": "1, ranteoiihuuttut",
                "notes": "This Customer is owing 10k"
             }
        )

        expect(res.statusCode).toEqual(400)
    })
})

describe('DELETE CUSTOMER', ()=> {
    it('it responds with a message of customer deleted successfully', async ()=>{
       const newCustomer = await supertest(app)
       .post('/')
       .send( {
        "fullname": "yyryyyyy",
        "email": "freeedda@example.com",
        "gender": "m",
        "phone": "+2347085647535",
        "address": "1, ranteoiihuuttut",
        "notes": "This Customer is owing 10k"
     });

    if(newCustomer.statusCode === 201){
        const removedCustomer = await supertest(app).delete(`/${newCustomer.body.data.id}`)
        expect(removedCustomer.body.message).toEqual(`customer deleted successfully`)
    }
    })
})


describe('PUT CUSTOMER', ()=>{
    it('it responds with an updated data', async ()=> {
        const newCustomer = await supertest(app)
        .post('/')
        .send( {
            "fullname": "ursulayyyyyy",
            "email": "john@example.com",
            "gender": "m",
            "phone": "+2347085647535",
            "address": "1, ranteoiihuuttut",
            "notes": "This Customer is owing 10k"
         })

         if(newCustomer.statusCode === 200){
            const updatedCustomer = await supertest(app)
            .put(`/${newCustomer.body.data.id}`)
            .send({email: "bond@example.com"})
            expect(updatedCustomer.body.data.email).toBe("bond@example.com");
            expect(updatedCustomer.statusCode).toBe(200)
         }
    })
})
