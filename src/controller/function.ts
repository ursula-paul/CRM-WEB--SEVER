import { json } from "express"
import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const userDataPath='./userdata.json'
const saltRounds = 10;

export interface customer{
    id : number,
    fullname: string,
    email: string,
    gender:string,
    phone :number,
    address: string,
    notes:string

}

export interface login{

    email:string,
    password:string
}



function readStream() {
    return new Promise((resolve, reject)=>{
        
        let data =  fs.readFileSync("database.json", {encoding:'utf-8'}) 
        if(data) resolve(data)

        reject('no file')
    })
}


function writeStream(data:any): void {
    fs.writeFileSync('./database.json', JSON.stringify(data, null ,3))
}



// let rawData=readStream()
// let redefinedData=JSON.parse(rawD


export function register(name:string, email:string, password:string ){
    let id = uuidv4()
    password= bcrypt.hashSync(password, saltRounds);
    let data={id, name, email, password}
    //console.log(data);
    let dataNow=fs.readFileSync(userDataPath,{encoding:'utf-8'})
    if (!dataNow) {
        fs.writeFileSync(userDataPath, JSON.stringify([data], null ,3))
    }else if(dataNow){
        let checkDub=JSON.parse(dataNow).find((db:any)=>db.email==email)
        console.log(checkDub);
        if (checkDub) {
            return false
        }
        if (dataNow) {
            let dataParsed=JSON.parse(dataNow)
            dataParsed.push(data)
            fs.writeFileSync(userDataPath, JSON.stringify(dataParsed, null ,3))
        }

    }
    return true
}

export function login(email:string,password:string) {
    let data= fs.readFileSync(userDataPath,{encoding:'utf-8'})
    let foundData=JSON.parse(data).find((a:any)=>a.email==email)
    let response="No account found"
    
    // console.log(foundData);
    if (foundData) {
        console.log('found');
        if (bcrypt.compareSync(password, foundData['password'])) {
            response='correct password'  
        } else{
            response='password incorrect'
        }  
    }
    return response
    
}




// register('ursula','sula@gmail.com','1234')
// login('sula@gmail.com','1234')

export default {readStream, writeStream, register}
