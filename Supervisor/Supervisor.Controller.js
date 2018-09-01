let mongoose = require('mongoose');
let SupervisorSchema = mongoose.model('SupervisorSchema');

const SupervisorController = function() {
  this.addSupervisor = data => {
    return new Promise((reslove, reject) => {
      var supervisor = new SupervisorSchema({
        name: data.name,
        email: data.email,
        mobile: data.mobile
      });

      supervisor
        .save()
        .then(() => {
          reslove({ status: 200, message: 'Supervisor Added Successfully' });
        })
        .catch(() => {
          reject({
            status: 500,
            message: 'ERROR !!!! Supervisor is not added to the database'
          });
        });
    });
  };
};

module.exports = new SupervisorController();
