"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const function_1 = __importStar(require("../controller/function"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
let router = express_1.default.Router();
/* GET users listing. */
router.post('/signup', function (req, res, next) {
    let regStatus = function_1.default.register(req.body.name, req.body.email, req.body.password);
    if (regStatus) {
        res.status(200).send({ response: 'reg successful' });
    }
    else {
        res.status(400).send({ response: 'Account Already exist' });
    }
});
router.post('/login', async function (req, res, next) {
    console.log(req.body.email);
    let response = (0, function_1.login)(req.body.email, req.body.password);
    let email = req.body.email;
    if (response == 'correct password') {
        jsonwebtoken_1.default.sign({ email }, 'mysecret', (err, token) => {
            res.json({ response, token });
        });
    }
    else {
        res.json({ response });
    }
});
exports.default = router;
