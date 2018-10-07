const Mongoose      = require("../../Config/DBSchema");
const FormI1P1Schema = Mongoose.model("FormI1P1");

var FormI1P1Controller = function(){
    this.add = (Data) => {
        return new Promise((resolve,reject) => {
            var FormI1P1 = new FormI1P1Schema({
                studentId: Data.studentId,
                name:Data.name,
                address:Data.address,
                homePhone:Data.homePhone,
                mobilePhone:Data.mobilePhone,
                emails:Data.emails,
                semester:Data.semester,
                year:Data.year,
                cgpa:Data.cgpa
            })

            FormI1P1.save()
            .then(() => {
                resolve({"status":201,"message":"Added Form"})
            })
            .catch((err) => {
                reject({"status":404,"message":"Err "+err})
            });
        })
    }

    this.get = () => {
        return new Promise((resolve,reject) => {
            FormI1P1Schema.find().exec()
            .then((Data) => {
                resolve({"status":200,"message":"Get all data", "data":Data})
            })
            .catch((err) => {
                reject({"status":404,"message":"err "+err})
            })
        })
    }

      /**
     * 
     * getting a order by its id
     */
    this.getFormByID = (id) => {
        return new Promise((resolve, reject) => {
            FormI1P1Schema.find({ studentId: id }).exec()
                .then((data) => {
                    if (data.length === 1) {

                        resolve({ "status": "200", "message": data });
                    } else {

                        resolve({ status: 200, message: "order doesn't exist" });
                    }
                })
                .catch((err) => {
                    reject({ status: 500, message: err })
                })
        })
    }
}

module.exports = new FormI1P1Controller();