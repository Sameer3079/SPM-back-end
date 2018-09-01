const Express = require('express');
const Routes = Express.Router();
const StudentRoute = require('./Student/Student.Route');
const AdminRoute = require('./Admin/Admin.Route');
const SupervisorRoute = require('./Suppervisor/Supervisor.Route');

Routes.use('/student', StudentRoute);
Routes.use('/admin', AdminRoute);
Routes.use('/supervisor', StudentRoute);

module.exports = Routes;
