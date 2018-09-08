const Mongoose = require("../Config/DBSchema");
const StudentSchema = Mongoose.model("Student");
// let fs = require('fs')
// let multer = require('multer')
// let formI6Directory = '../student_forms/form_i6/'
// let uploadFormI6 = multer({ dest: formI6Directory }).single('word_document')

var StudentController = function(){
    /*
        student register function
    */
   this.add = (Data) => {
    return new Promise((resolve,reject) => {
        /*
            Check student already exists or not
        */

        StudentSchema.find({studentId:Data.studentId}).exec()
        .then(data => {
            if(data.length === 0){

                var Student = new StudentSchema({
                    studentId:Data.studentId,
                    firstName:Data.firstName,
                    lastName:Data.lastName,
                    company:Data.company,
                    supervisor:Data.supervisor,
                    academicYear:Data.academicYear
                })
    
                Student.save()
                .then(() => {
                    resolve({"status":201,"message":"Add Student"});
                })
                .catch((err) => {
                    reject({"status":404,"message":"Err "+err});
                });
            }
            else{
                resolve({"status":200,"message":"Already Existing"})
            }
        })
        .catch((err) => {
            reject({"status":"500","message":"Error "+err});
        })
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

}

module.exports = new StudentController();