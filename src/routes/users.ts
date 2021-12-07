import { NextFunction, Response ,Request } from "express";
import util, { login } from "../controller/function";
import bcrypt from "bcrypt";
import  Jwt  from "jsonwebtoken";

import express from 'express';
let router = express.Router();

/* GET users listing. */
router.post('/signup', function(req: Request, res: Response, next: NextFunction) {
  let regStatus=util.register(req.body.name,req.body.email,req.body.password)
  if (regStatus) {
      res.status(200).send({response:'reg successful'})
  }
  else{
    res.status(400).send({response:'Account Already exist'})
  }
})

router.post('/login', async function(req:Request, res:Response, next:NextFunction){

    console.log(req.body.email);
    let response= login(req.body.email, req.body.password)
    let email=req.body.email
    if (response=='correct password') {
     Jwt.sign({email},'mysecret',(err:any,token:any)=>{
        res.json({response,token});
      })
    }else{
      res.json({response});
    }
})



export default router;
