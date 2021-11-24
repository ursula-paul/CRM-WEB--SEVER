import { json } from "express"
import fs from "fs"

export interface customer{
    id : number,
    fullname: string,
    email: string,
    gender:string,
    phone :number,
    address: string,
    notes:string

}

export interface  ErorrHandler {

    
}

function readStream() {
    return new Promise((resolve, reject)=>{

        let data =  fs.readFileSync('./database.json',{encoding:'utf-8'}) 
      
        resolve(data)
    })
}


function writeStream(data:any) {
    fs.writeFileSync('./database.json', JSON.stringify(data,null,3))
}

// let rawData=readStream()
// let redefinedData=JSON.parse(rawD





export default {readStream, writeStream}
