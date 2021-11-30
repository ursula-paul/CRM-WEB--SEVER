"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const function_1 = __importDefault(require("../controller/function"));
const express_1 = __importDefault(require("express"));
let router = express_1.default.Router();
// FOR GET ALL
/* GET home page. */
router.get('/', async (_req, res) => {
    try {
        let readData = await function_1.default.readStream();
        console.log("Data", readData);
        // console.log("I'm here");
        res.status(200).json(JSON.parse(readData));
    }
    catch (error) {
        console.log(error);
    }
});
// FOR GET BY ID
router.get('/:id', async (req, res) => {
    try {
        let readData = await function_1.default.readStream();
        let parseData = JSON.parse(readData);
        const foundCustomer = parseData.find((ele) => `${ele.id}` === req.params?.id);
        if (!foundCustomer) {
            return res.status(404).json({ message: "customer not found " });
        }
        res.status(200).json(foundCustomer);
    }
    catch (error) {
        console.log(error);
    }
});
router.post('/', async (req, res) => {
    try {
        let current_data = await function_1.default.readStream();
        let parseData = JSON.parse(current_data);
        let userId;
        if (parseData.length === 0) {
            userId = 1;
        }
        else {
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
        };
        if (!details.fullname)
            return res.status(400).json({ message: "user fullname is required" });
        if (!details.email)
            return res.status(400).json({ message: "user email is required" });
        if (!details.gender)
            return res.status(400).json({ message: "user gender is required" });
        if (!details.phone)
            return res.status(400).json({ message: "user phone number is required" });
        if (details.phone.length < 11 || details.phone.length > 14)
            return res.status(400).json({ message: "your  phone number must not be less than 11 or greater than 14" });
        if (!details.address)
            return res.status(400).json({ message: "user address is required" });
        const allEmails = parseData.map((elem) => elem.email);
        if (allEmails.includes(details.email))
            return res.status(400).json({ message: "email already exist try another" });
        parseData.push(details);
        function_1.default.writeStream(parseData);
        res.status(201).json({ message: `new customer added sucessfully`, data: details });
    }
    catch (error) {
        console.log(error);
    }
});
router.put('/:id', function (req, res, next) {
    async function putData() {
        let details = await function_1.default.readStream();
        let parsedDetails = JSON.parse(details);
        const foundDetails = parsedDetails.find((ele) => `${ele.id}` === req.params.id);
        if (!foundDetails) {
            return res.status(404).json({ message: "customer not found"
            });
        }
        const newData = { ...foundDetails, ...req.body };
        const dataIndex = parsedDetails.findIndex((ele) => `${ele.id}` === req.params.id);
        parsedDetails.splice(dataIndex, 1, newData);
        function_1.default.writeStream(parsedDetails);
        res.status(200).json({ message: 'updated the customer', data: parsedDetails });
    }
    putData();
});
router.delete('/:id', function (req, res, next) {
    async function deleteData() {
        let details = await function_1.default.readStream();
        let parsedDetails = JSON.parse(details);
        req.body.id;
        const dataToDelete = parsedDetails.find((ele) => `${ele.id}` === req.params.id);
        if (dataToDelete) {
            const deletedData = parsedDetails.filter((ele) => `${ele.id}` !== req.params.id);
            function_1.default.writeStream(deletedData);
            return res.status(201).json({ message: "customer deleted successfully", data: deletedData });
        }
        //res.status(404).json({message:"Customer to delete not found"})
    }
    deleteData();
});
exports.default = router;
