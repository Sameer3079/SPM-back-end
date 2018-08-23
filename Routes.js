const Express       = require("express");
const Routes        = Express.Router();
const StudentRoute  = require('./Student/Student.Route');


Routes.use('/student', StudentRoute);

module.exports = Routes;