"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userDataPath = './userdata.json';
const saltRounds = 10;
function readStream() {
    return new Promise((resolve, reject) => {
        let data = fs_1.default.readFileSync("database.json", { encoding: 'utf-8' });
        if (data)
            resolve(data);
        reject('no file');
    });
}
function writeStream(data) {
    fs_1.default.writeFileSync('./database.json', JSON.stringify(data, null, 3));
}
// let rawData=readStream()
// let redefinedData=JSON.parse(rawD
function register(name, email, password) {
    let id = (0, uuid_1.v4)();
    password = bcrypt_1.default.hashSync(password, saltRounds);
    let data = { id, name, email, password };
    //console.log(data);
    let dataNow = fs_1.default.readFileSync(userDataPath, { encoding: 'utf-8' });
    if (!dataNow) {
        fs_1.default.writeFileSync(userDataPath, JSON.stringify([data], null, 3));
    }
    else if (dataNow) {
        let checkDub = JSON.parse(dataNow).find((db) => db.email == email);
        console.log(checkDub);
        if (checkDub) {
            return false;
        }
        if (dataNow) {
            let dataParsed = JSON.parse(dataNow);
            dataParsed.push(data);
            fs_1.default.writeFileSync(userDataPath, JSON.stringify(dataParsed, null, 3));
        }
    }
    return true;
}
exports.register = register;
function login(email, password) {
    let data = fs_1.default.readFileSync(userDataPath, { encoding: 'utf-8' });
    let foundData = JSON.parse(data).find((a) => a.email == email);
    let response = "No account found";
    // console.log(foundData);
    if (foundData) {
        console.log('found');
        if (bcrypt_1.default.compareSync(password, foundData['password'])) {
            response = 'correct password';
        }
        else {
            response = 'password incorrect';
        }
    }
    return response;
}
exports.login = login;
// register('ursula','sula@gmail.com','1234')
// login('sula@gmail.com','1234')
exports.default = { readStream, writeStream, register };
