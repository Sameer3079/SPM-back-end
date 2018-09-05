const Mongoose = require("../Config/DBSchema");
const StudentSchema = Mongoose.model("Student");
let StudentForms = Mongoose.model('StudentForms')
let fs = require('fs')
let multer = require('multer')
let formI6Directory = '../student_forms/form_i6/'
let uploadFormI6 = multer({ dest: formI6Directory }).single('word_document')

var StudentController = function () {
    this.add = (Data) => {
        return new Promise((resolve, reject) => {
            var Student = new StudentSchema({
                studentId: Data.studentId,
                name: Data.name
            })

            Student.save()
                .then(() => {
                    resolve({ "status": 201, "message": "Added Student" })
                })
                .catch((err) => {
                    reject({ "status": 404, "message": "Err " + err })
                });
        })
    }

    this.get = () => {
        return new Promise((resolve, reject) => {
            StudentSchema.find().exec()
                .then((Data) => {
                    resolve({ "status": 200, "message": "Get all data", "data": Data })
                })
                .catch((err) => {
                    reject({ "status": 404, "message": "err " + err })
                })
        })
    }

    // TODO: Implement
    this.submitFormI6 = (studentId, req) => {
        return new Promise((resolve, reject) => {
            // upload(req, res, err => {
            //     if (err) {
            //         reject({ status: 422, error: err })
            //     }
            //     filePath = req.file.path
            //     resolve({ status: 201 })
            // })
        })
    }
}

module.exports = new StudentController();