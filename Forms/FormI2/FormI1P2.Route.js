const Express               = require("express");
const Route                 = Express.Router();
const FormI1P2Controller     = require("./FormI1P2.Controller");


//adding a new form
Route.post('/', (req,res) => {
    FormI1P2Controller.add(req.body)
    .then((data) => {
        res.status(data.status).send({message:data.message})
    })
    .catch((err) => {
        res.status(err.status).send({message:err.message})
    })
});

//getting all forms added by supervisor
Route.get('/', (req,res) => {
    FormI1P2Controller.get()
    .then((Data) => {
        res.status(Data.status).send(Data)
    })
    .catch((err) => {
        res.status(err.status).send(err.message);
    })
})


module.exports = Route;