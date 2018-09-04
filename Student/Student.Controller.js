const Mongoose      = require("../Config/DBSchema");
const StudentSchema = Mongoose.model("Student");
let StudentForms = Mongoose.model('StudentForms')
let functions = require('../functions')
let fs = require('fs')

var StudentController = function(){
    this.add = (Data) => {
        return new Promise((resolve,reject) => {
            var Student = new StudentSchema({
                studentId: Data.studentId,
                name:Data.name
            })

            Student.save()
            .then(() => {
                resolve({"status":201,"message":"Added Student"})
            })
            .catch((err) => {
                reject({"status":404,"message":"Err "+err})
            });
        })
    }

    this.get = () => {
        return new Promise((resolve,reject) => {
            StudentSchema.find().exec()
            .then((Data) => {
                resolve({"status":200,"message":"Get all data", "data":Data})
            })
            .catch((err) => {
                reject({"status":404,"message":"err "+err})
            })
        })
    }

    // TODO: Test Method
    this.submitFormI6 = (studentId, formI6) => {
        return new Promise((resolve, reject) => {
            functions.isStudentValid(studentId).then(validity => {
                if (validity == true) {
                    let document = JSON.parse(formI6)
                    fs.writeFile('./student_forms/form_i6/'+studentId + '-form-I6', document, err => {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            let studentFormRecord = new StudentForms({
                                studentId: studentId,
                                fileName: studentId
                            })
                            studentFormRecord.save().then(data => {

                            }).catch(err => {

                            })
                        }
                    })
                }
                else {
                    reject({ status: 999, message: "Stude" }) // TODO: 
                }
            }).catch(err => {
                reject({ status: 999, message: err }) // TODO: 
            })


        })
    }
}

module.exports = new StudentController();