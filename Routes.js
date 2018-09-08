const Express       = require("express");
const Routes        = Express.Router();

const StudentRoute  = require('./Student/Student.Route');
const AdminRoute    = require('./Admin/Admin.Route')
const CompanyRoute  = require('./Company/Company.Route');


Routes.use('/student', StudentRoute);
Routes.use('/admin', AdminRoute);
Routes.use('/company',CompanyRoute);

module.exports = Routes;