import { json, NextFunction, Request, response, Response} from "express"
import help from "../controller/function";
import { customer } from "../controller/function";
import express from 'express';
let router = express.Router();

// FOR GET ALL
/* GET home page. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  async function getData() {
    let readData = await help.readStream()
    res.status(200)
    res.send(readData)
  }
  getData()

});

// FOR GET BY ID

router.get('/:id',function(req:Request, res:Response, next:NextFunction){
  async function getById() {
    let readData:any = await help.readStream()
    let parseData=JSON.parse(readData)
    const foundCustomer = parseData.find((ele:customer)=> `${ele.id}` === req.params.id)
    if(!foundCustomer ){
    
      return res.status(404).json({message:"customer not found "})  
     
      
    }  

    res.status(200).json(foundCustomer)
   
  }

  getById()

})



router.post('/', function (req:Request, res:Response, next:NextFunction) {
  async function postData() {
    let current_data:any= await help.readStream()
    let parseData=JSON.parse(current_data)
    let details = {
                  "id":parseData.length+1,
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
      if(details.phone.length < 11 || details.phone.length > 14 ) return res.status(400).json({message:"your  phone number must not be less than 11 or greater than 14"})
      if(!details.address) return res.status(400).json({message:"user address is required"})
      const allEmails = parseData.map((elem: customer) => elem.email)

      if(allEmails.includes(details.email))return res.status(400).json({message: "email already exist try another"})

    parseData.push(details)
    help.writeStream(parseData)
    res.send(details)

  }
  
postData()      

})


router.put('/:id', function (req:Request, res:Response, next:NextFunction) {
  async function putData(){
    let details : any = await help.readStream()
    let parsedDetails = JSON.parse(details)
    req.body.id
    // res.send(parsedDetails)
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
    //res.send(details)


  }
  putData()
})


router.delete('/:id', function(req:Request, res:Response, next:NextFunction){
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
})



export default router;