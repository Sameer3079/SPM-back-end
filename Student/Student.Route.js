const Express               = require("express");
const Route                 = Express.Router();
const StudentController     = require("./Student.Controller");
let multer = require('multer')
let dir = './student_forms/form_i6/'


Route.post('/', (req,res) => {
    StudentController.add(req.body)
    .then((data) => {
        res.status(data.status).send({message:data.message})
    })
    .catch((err) => {
        res.status(err.status).send({message:err.message})
    })
});

Route.get('/', (req,res) => {
    StudentController.get()
    .then((Data) => {
        res.status(Data.status).send(Data)
    })
    .catch((err) => {
        res.status(err.status).send(err.message);
    })
})

Route.post('/submit-form-i6/:studentId', (req, res) => {
    let studentId = req.params.studentId
    let filePath = ''

    // Storage Configurations
    let storage = multer.diskStorage({
        // Location
        destination: (req, file, cb) => {
            cb(null, './student_forms/form_i6/')
        },
        // File name & Extension
        filename: (req, file, cb) => {
            console.log(file.mimetype)
            let substringArray = file.originalname.split('.')
            let substringCount = substringArray.length
            let fileExtension = substringArray[substringCount - 1]
            cb(null, studentId + '.'+fileExtension)
        }
    })
    // Passing storage config. & field value to get the file from
    let upload = multer({ storage: storage }).single('form_i6')

    upload(req, res, err => {
        if (err) {
            console.log(err)
            return res.status(422).send("Error occured")
        }
        filePath = req.file.path
        return res.send("Upload completed for " + filePath)
    })
})

module.exports = Route;