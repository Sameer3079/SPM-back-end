const Express               = require("express");
const Route                 = Express.Router();
const StudentController     = require("./Student.Controller");
let multer = require('multer')
let dir = './student_forms/form_i6/'
const Mongoose = require("../Config/DBSchema");
const StudentSchema = Mongoose.model("Student");
let StudentForms = Mongoose.model('StudentForms')
let fs = require('fs')



/**
 *  Student post
 */
Route.post('/', (req,res) => {
    StudentController.add(req.body)
    .then((data) => {
        res.status(data.status).send({message:data.message})
    })
    .catch((err) => {
        res.status(err.status).send({message:err.message})
    })
});

/**
 *  Student get
 */
Route.get('/', (req,res) => {
    StudentController.get()
    .then((Data) => {
        res.status(Data.status).send(Data)
    })
    .catch((err) => {
        res.status(err.status).send(err.message);
    })
})

// Submit form
Route.post('/submit-form-i6/:studentId', (req, res) => {
    let studentId = req.params.studentId

    StudentSchema.findOne({ studentId: studentId })
        .then(studentRecord => {
            if (studentRecord === null) {
                res.status(400).send({
                    status: false,
                    message: "Student is not registered"
                })
            }
            else {
                let filePath = ''
                let fileExtension = '';

                // Storage Configurations
                let storage = multer.diskStorage({
                    // Location
                    destination: (req, file, cb) => {
                        cb(null, './student_forms/form_i6/')
                    },
                    // File name & Extension
                    filename: (req, file, cb) => {
                        let substringArray = file.originalname.split('.')
                        let substringCount = substringArray.length
                        fileExtension = substringArray[substringCount - 1]
                        // If the file is not a word document
                        if (fileExtension !== 'doc' && fileExtension !== 'docx' && fileExtension !== 'docm'
                            && fileExtension !== 'docb') {
                            return res.status(400).send({
                                status: false,
                                message: "The document uploaded is not a word document"
                            })
                        }
                        cb(null, studentId + '.' + fileExtension)
                    }
                })
                // Passing storage config. & field value to get the file from
                let upload = multer({ storage: storage }).single('form_i6')

                upload(req, res, err => {
                    if (err) {
                        console.log(err)
                        res.status(422).send({
                            // status: true => successful, false => failure
                            status: false,
                            message: "Error occured when uploading file"
                        })
                    }
                    else {
                        filePath = req.file.path

                        let studentFormRecord = new StudentForms({
                            studentId: studentId,
                            i6FileExtension: fileExtension
                        })
                        studentFormRecord.save()
                            .then(data => {
                                res.status(201).send({
                                    status: true,
                                    message: "The file was uploaded successfully and the file extension was saved "
                                        + "in the database"
                                })
                            })
                            .catch(error => {
                                fs.unlink('./student_forms/' + studentId + '.' + fileExtension, () => {
                                    res.status(500).send({
                                        status: false,
                                        message: "The file was uploaded successfully but an error occured when "
                                            + "saving the file extension in the database, so the file was deleted",
                                        error: error
                                    })
                                })
                            })
                    }
                })
            }
        })
        .catch(error => {
            res.status(500).send({
                status: false,
                message: "Error encountered while searching for student"
            })
        })
})

Route.post('/dailydiary', (req, res) => {
    StudentController.addDailyDiary(req.body)
      .then(data => {
        res.status(data.status).send({ message: data.message });
      })
      .catch(err => {
        res.status(err.status).send({ message: err.message });
      });
  });

  Route.get('/dailydiary', (req,res) => {
    StudentController.getDailyDiary()
    .then((Data) => {
        res.status(Data.status).send(Data)
    })
    .catch((err) => {
        res.status(err.status).send(err.message);
    })
})
module.exports = Route;