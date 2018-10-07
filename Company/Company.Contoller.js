const Mongoose          = require('../Config/DBSchema');
const CompanySchema     = Mongoose.model('Company');

var CompanyController = function(){
    /**
     * 
     * Implement saveCompany function. 
     */
    this.saveCompany = (Data) => {
        return new Promise((resolve,reject) => {

            CompanySchema.find({companyName:Data.companyName}).exec()
            .then((data) => {

                /**
                 * Check company allready exists or not
                 */
                if(data.length === 0){

                    var company = new CompanySchema({

                        companyName:Data.companyName,
                        companyContact:Data.companyContact,
                        address:Data.address,
                        email:Data.email
                    });

                    company.save()
                    .then(() => {
                        resolve({"status":"201","message":"Add Company"});
                    })
                    .catch((err) => {
                        reject({"status":"404","message":"Error "+err});
                    });
                }
                else{
                    resolve({"status":"500","message":"Company Already Exists"});
                }
            })
            .catch()
        })
    }

    /**
     *  Implement getAllCompany function.
     */
    this.getAllCompany = () => {
        
        return new Promise((resolve,reject) => {
            CompanySchema.find().exec()
            .then((Data) => {
                resolve({"status":"200","message":"get all data","data":data});
            })
            .catch((err) => {
                reject({"status":"404","essage":"Error "+err});
            });
        })
    }
}

module.exports = new CompanyController();