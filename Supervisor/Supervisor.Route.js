const Express               = require("express");
const Route                 = Express.Router();
const SupervisorController     = require("./Supervisor.Controller");

Route.post('/', (req,res) => {
    SupervisorController.add(req.body)
    .then((data) => {
        res.status(data.status).send({message:data.message})
    })
    .catch((err) => {
        res.status(err.status).send({message:err.message})
    })
});

Route.get('/', (req,res) => {
    SupervisorController.get()
    .then((Data) => {
        res.status(Data.status).send(Data)
    })
    .catch((err) => {
        res.status(err.status).send(err.message);
    })
})

module.exports = Route;