const Mongoose      = require("../Config/DBSchema");
const SupervisorSchema = Mongoose.model("Supervisor");

var SupervisorController = function(){
    this.add = (Data) => {
        return new Promise((resolve,reject) => {
            var Supervisor = new SupervisorSchema({
                nic: Data.nic,
                firstname:Data.firstname,
                lastname:Data.lastname,
                email:Data.email,
                password:Data.password,
                confirmPassword:Data.confirmPassword
            })

            Supervisor.save()
            .then(() => {
                resolve({"status":201,"message":"Added Supervisor"})
            })
            .catch((err) => {
                reject({"status":404,"message":"Err "+err})
            });
        })
    }

    this.get = () => {
        return new Promise((resolve,reject) => {
            SupervisorSchema.find().exec()
            .then((Data) => {
                resolve({"status":200,"message":"Get all data", "data":Data})
            })
            .catch((err) => {
                reject({"status":404,"message":"err "+err})
            })
        })
    }
}

module.exports = new SupervisorController();