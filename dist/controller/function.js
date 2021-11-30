"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
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
exports.default = { readStream, writeStream };
