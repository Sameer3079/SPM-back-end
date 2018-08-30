let mongoose = require('mongoose')
let studentSchema = mongoose.model('Student')
let studentVivaSchedule = mongoose.model('StudentVivaSchedule')

let adminController = function () {
    this.scheduleStudentViva = (studentId, dateTime, location) => {
        return new Promise((resolve, reject) => {
            // Checking whether the student ID is valid
            studentSchema.find({ studentId: studentId }).then(data => {
                if (data.length == 0) {
                    reject({ status: 400, message: 'Invalid Student ID' })
                }
            }).catch(error => {
                reject({ status: 400, message: 'Error occured while searching for Student' })
            })

            // Checking whether the entered date are valid (e.g. whether they are in the future)
            let nowDateTime = new Date()
            if (dateTime < nowDateTime) {
                reject({ status: 400, message: 'Scheduled date has already passed' })
            }

            // Save the scheduled viva session details in the database
            let scheduleObj = new studentVivaSchedule({
                studentId: studentId,
                dateTime: dateTime,
                location: location
            })
            scheduleObj.save()
                .then(
                    resolve({ status: 201, message: 'Successfully saved the schedule in the database' })
                )
                .catch(error => {
                    reject({ status: 400, message: 'Error occured while saving the schedule in the database' })
                })
        })
    }
}

module.exports = new adminController()