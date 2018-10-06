const Mongoose      = require("../../Config/DBSchema");
const FormI1P2Schema = Mongoose.model("FormI1P2");

var FormI1P2Controller = function(){
    this.add = (Data) => {
        return new Promise((resolve,reject) => {
            var FormI1P2 = new FormI1P2Schema({
                employerName: Data.employerName,
                employerAddress:Data.employerAddress,
                superVisorName:Data.superVisorName,
                superVisorPhone:Data.superVisorPhone,
                superVisorTitle:Data.superVisorTitle,
                superVisorEmail:Data.superVisorEmail,
                startDate:Data.startDate,
                NoOfHours:Data.NoOfHours,
                tasks:Data.tasks,
                learnings:Data.learnings,
                externalSupervisorName:Data.externalSupervisorName,
                date:Data.date
            })

            FormI1P2.save()
            .then(() => {
                resolve({"status":201,"message":"Added Form"})
            })
            .catch((err) => {
                reject({"status":404,"message":"Err "+err})
            });
        })
    }


    //get all forms filled by supervisor
    this.get = () => {
        return new Promise((resolve,reject) => {
            FormI1P2Schema.find().exec()
            .then((Data) => {
                resolve({"status":200,"message":"Get all data", "data":Data})
            })
            .catch((err) => {
                reject({"status":404,"message":"err "+err})
            })
        })
    }
}

module.exports = new FormI1P2Controller();