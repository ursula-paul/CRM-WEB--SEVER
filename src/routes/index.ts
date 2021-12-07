import {  NextFunction, Request, Response } from "express"
import help from "../controller/function";
import { customer } from "../controller/function";
import express from 'express';

import jwt from "jsonwebtoken";

let router = express.Router();

// FOR GET ALL
/* GET home page. */
router.get('/',verifyToken, (req: any, res: Response) => {

  jwt.verify(req.token,'mysecret',async(err:any,data:any)=>{
    if (err) {
      res.sendStatus(403)
    }else{
      try {
        let readData: any = await help.readStream();
        console.log("Data", readData);
        // console.log("I'm here");
        res.status(200).json(JSON.parse(readData));
        
      } catch (error) {
        console.log(error);
      }
    }
  })

  
});

// FOR GET BY ID

router.get('/:id', verifyToken,async (req:any, res:Response) => {
  jwt.verify(req.token,'mysecret',async(err:any,data:any)=>{
    if (err) {
      res.sendStatus(403)
    }else{
      try {
        let readData : any = await help.readStream();
        let parseData = JSON.parse(readData);
        const foundCustomer = parseData.find((ele:customer)=> `${ele.id}` === req.params?.id);
          if(!foundCustomer ){
            return res.status(404).json({message:"customer not found "})
          }  
        res.status(200).json(foundCustomer)
      } 
        catch (error) {
          console.log(error)
      }
    }
  })
})





router.post('/',verifyToken ,async (req:any, res:Response) => {
  jwt.verify(req.token,'mysecret',async(err:any,data:any)=>{
    if (err) {
      res.sendStatus(403)
    }else{
      try {
        let current_data:any = await help.readStream()
        let parseData = JSON.parse(current_data)
        let userId;
    
        if (parseData.length === 0) {
          userId = 1;
        } else {
          userId = parseData.length + 1;
        }
        
        
        // console.log('dfdfdfd');
        let details = {
          "id": userId,
          "fullname": req.body.fullname,
          "email": req.body.email,
          "gender": req.body.gender,
          "phone": req.body.phone,
          "address": req.body.address,
          "notes": req.body.notes
        }
        
        if(!details.fullname) return res.status(400).json({message:"user fullname is required"})
        if(!details.email) return res.status(400).json({message:"user email is required"})
        if(!details.gender) return res.status(400).json({message:"user gender is required"})
        if(!details.phone) return res.status(400).json({message:"user phone number is required"})
        if(details.phone.length < 11 || details.phone.length > 14 ) 
        return res.status(400).json({message:"your  phone number must not be less than 11 or greater than 14"})
        if(!details.address) return res.status(400).json({message:"user address is required"})
        const allEmails = parseData.map((elem: customer) => elem.email)
    
        if(allEmails.includes(details.email))return res.status(400).json({message: "email already exist try another"})
    
        parseData.push(details)
        help.writeStream(parseData)
        res.status(201).json({message:`new customer added sucessfully`, data:details})      
        
      } catch (error) {
        console.log(error)
      }
    }
  })
})


router.put('/:id', verifyToken,function (req:any, res:Response, next:NextFunction) {
  jwt.verify(req.token,'mysecret',async(err:any,data:any)=>{
    if (err) {
      res.sendStatus(403)
    }else{
      async function putData(){
        let details : any = await help.readStream()
        let parsedDetails = JSON.parse(details)
    
        const foundDetails = parsedDetails.find((ele:customer)=> `${ele.id}` === req.params.id)
        if(! foundDetails ){
          return res.status(404).json({message:"customer not found"
          }) 
        }
        const newData ={...foundDetails,...req.body}
        const dataIndex = parsedDetails.findIndex((ele:customer)=>`${ele.id}` === req.params.id)
        parsedDetails.splice(dataIndex,1,newData)
        help.writeStream(parsedDetails)
        res.status(200).json({message:'updated the customer', data:parsedDetails})
      
    
    
      }
      putData()
    }
  })
})


router.delete('/:id',verifyToken ,function(req:any, res:Response, next:NextFunction){
  jwt.verify(req.token,'mysecret',async(err:any,data:any)=>{
    if (err) {
      res.sendStatus(403)
    }else{
      async function deleteData() {
        let details:any = await help.readStream()
        let parsedDetails =JSON.parse(details)
        req.body.id
        const dataToDelete = parsedDetails.find((ele:customer)=>`${ele.id}` === req.params.id)
        if(dataToDelete){
          
          const deletedData = parsedDetails.filter((ele:customer)=>`${ele.id}` !== req.params.id)
          help.writeStream(deletedData)
          return res.status(201).json({message:"customer deleted successfully", data:deletedData})
        }
        //res.status(404).json({message:"Customer to delete not found"})
      }
      deleteData()
    }
  })
})




export function verifyToken(req:any, res:any, next:any) {
  const bearerHeader = req.headers['authorization']
  if(typeof bearerHeader !== 'undefined'){
      const bearerToken = bearerHeader.split(' ')[1]
      req.token = bearerToken
      next()
  } else {
      res.sendStatus(403) //forbidden
  }
}

export default router;
