let mongoose = require('./Config/DBSchema')
let studentSchema = mongoose.model('Student')

let functions = function () {
    this.isValidStudent = studentId => {
        return new Promise((resolve, reject) => {
            studentSchema.find(studentId)
                .then(data => {
                    if (data.length > 0) {
                        resolve(true)
                    }
                    else {
                        resolve(false)
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}

module.exports = new functions()