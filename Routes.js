const Express       = require("express");
const Routes        = Express.Router();
const StudentRoute  = require('./Student/Student.Route');
const AdminRoute = require('./Admin/Admin.Route');
const FormI1RouteP1 = require('./Forms/FormI1/FormI1P1.Route');

Routes.use('/student', StudentRoute);
Routes.use('/admin', AdminRoute);
Routes.use('/form/formI1P1', FormI1RouteP1);

module.exports = Routes;