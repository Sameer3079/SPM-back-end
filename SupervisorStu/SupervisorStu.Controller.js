const Mongoose      = require("../Config/DBSchema");
const SupervisorStuSchema = Mongoose.model("SupervisorStu");

var SupervisorStuController = function(){
    this.add = (Data) => {
        return new Promise((resolve,reject) => {
            var SupervisorStu = new SupervisorStuSchema({
                supervisorName: Data.supervisorName,
                studentName:Data.studentName,
                studentID:Data.studentID,
                companyName:Data.companyName,
                dateStarted:Data.dateStarted
            })

            SupervisorStu.save()
            .then(() => {
                resolve({"status":201,"message":"Added Student for Supervisor"})
            })
            .catch((err) => {
                reject({"status":404,"message":"Err "+err})
            });
        })
    }

    this.get = () => {
        return new Promise((resolve,reject) => {
            SupervisorStuSchema.find().exec()
            .then((Data) => {
                resolve({"status":200,"message":"Get all data", "data":Data})
            })
            .catch((err) => {
                reject({"status":404,"message":"err "+err})
            })
        })
    }
}

module.exports = new SupervisorStuController();


