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

})

module.exports = Route;