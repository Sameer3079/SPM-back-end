const Express               = require("express");
const Route                 = Express.Router();
const FormI1P1Controller     = require("./FormI1P1.Controller");

Route.post('/', (req,res) => {
    FormI1P1Controller.add(req.body)
    .then((data) => {
        res.status(data.status).send({message:data.message})
    })
    .catch((err) => {
        res.status(err.status).send({message:err.message})
    })
});

Route.get('/', (req,res) => {
    FormI1P1Controller.get()
    .then((Data) => {
        res.status(Data.status).send(Data)
    })
    .catch((err) => {
        res.status(err.status).send(err.message);
    })
})


module.exports = Route;