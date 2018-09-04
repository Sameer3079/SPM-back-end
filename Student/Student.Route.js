const Express               = require("express");
const Route                 = Express.Router();
const StudentController     = require("./Student.Controller");

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

Route.post('/submit-form-i6', (req, res) => {
    let studentId = req.body.studentId
    let formI6 = req.body.formI6

    StudentController.submitFormI6(studentId, formI6)
        .then(data => {
            res.status(data.status).send(data.message)
        })
        .catch(err => {
            res.status(err.status).send(err.message)
        })
})

module.exports = Route;