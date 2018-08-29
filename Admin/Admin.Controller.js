let mongoose = require('mongoose')
let studentSchema = mongoose.model('Student')
let studentVivaSchedule = mongoose.model('StudentVivaSchedule')

let adminController = function () {
    this.scheduleStudentViva = (studentId, dateTime, location) => {
        return new Promise((resolve, reject) => {
            // check whether the studentId is valid
            studentSchema.find({ studentId: studentId }).then(data => {
                if (data.length == 0) {
                    reject({ status: 999, message: 'Invalid Student ID' }) // TODO: Return proper HTTP status code
                }
            }).catch(error => {
                reject({ status: 999, message: 'Error occured while searching for Student' }) // TODO: Return proper HTTP status code
            })

            // check whether the entered date and time are valid (e.g. whether they are in the future)
            let nowDateTime = new Date()
            if (dateTime < nowDateTime) {
                reject({ status: 999, message: 'Scheduled date has already passed' })
            }

            //

            // save the scheduled viva session details
            let scheduleObj = new studentVivaSchedule({
                studentId: studentId,
                dateTime: dateTime,
                location: location
            })
            scheduleObj.save()
                .then(
                    resolve({ status: 999, message: 'Successfully saved the schedule in the database' }) // TODO: Return proper HTTP status code
                )
                .catch(error => {
                    reject({ status: 999, message: 'Error occured while saving the schedule in the database' }) // TODO: Return proper HTTP status code
                })
        })
    }
}

module.exports = new adminController()