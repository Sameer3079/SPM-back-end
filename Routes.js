const Express       = require("express");
const Routes        = Express.Router();
const StudentRoute  = require('./Student/Student.Route');
const AdminRoute = require('./Admin/Admin.Route')


Routes.use('/student', StudentRoute);
Routes.use('/admin', AdminRoute);

module.exports = Routes;