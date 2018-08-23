const Mongoose      = require("../Config/DBSchema");
const StudentSchema = Mongoose.model("Student");

var StudentController = function(){
    this.add = (Data) => {
        return new Promise((resolve,reject) => {
            var Student = new StudentSchema({
                name:Data.name
            })

            Student.save()
            .then(() => {
                resolve({"status":201,"message":"Add Student"})
            })
            .catch((err) => {
                reject({"status":404,"message":"Err "+err})
            });
        })
    }

    this.get = () => {
        return new Promise((resolve,reject) => {
            StudentSchema.find().exec()
            .then((Data) => {
                resolve({"status":200,"message":"Get all data", "data":Data})
            })
            .catch((err) => {
                reject({"status":404,"message":"err "+err})
            })
        })
    }
}

module.exports = new StudentController();