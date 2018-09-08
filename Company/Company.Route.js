const Express               = require('express');
const Route                 = Express.Router();
const CompanyContoller      = require('./Company.Contoller');


/**
 *  Company post 
 */
Route.post('/', (req,res) => {
    CompanyContoller.saveCompany(req.body)
    .then((data) => {
        res.status(data.status).send({message:data.message});
    })
    .catch((err) => {
        res.status(data.status).send({message:data.message});
    });
})

/**
 *  Company get
 */
Route.get('/', (req,res) => {
    CompanyContoller.getAllCompany(req.body).
    then((data) => {
        res.status(data.status).send({"message":data.data});
    })
    .catch((err) => {
        res.status(err.status).send({"message":err.err});    
    });
})

module.exports = Route;