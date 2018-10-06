let mongoose = require('mongoose')
let studentSchema = mongoose.model('Student')
let studentVivaSchedule = mongoose.model('StudentVivaSchedule')

let adminController = function () {

    // Schedule viva for student
    this.scheduleStudentViva = (studentId, dateTime, location) => {
        return new Promise((resolve, reject) => {
            // Checking whether the student ID is valid
            studentSchema.find({ studentId: studentId }).then(data => {
                if (data.length == 0) {
                    reject({ status: 400, message: 'Invalid Student ID' })
                }
                else {
                    studentVivaSchedule.findOne({ studentId: studentId }).then(data => {
                        if (data === null) {
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
                        }
                        else {
                            reject({ status: 400, message: 'A viva has already been scheduled for this student' })
                        }
                    })
                }
            }).catch(error => {
                reject({ status: 400, message: 'Error occured while searching for Student' })
            })
        })
    }

    // Get schedules of all students
    this.getAllSchedules = () => {
        return new Promise((resolve, reject) => {
            studentVivaSchedule.find()
                .then(data => {
                    resolve({ status: 200, data: data })
                })
                .catch(err => {
                    reject({ status: 500, error: err })
                })
        })
    }

    // Get schedule of a specific student
    this.getStudentSchedule = studentId => {
        return new Promise((resolve, reject) => {
            // Checking the student ID is valid
            studentSchema.findOne({ studentId: studentId })
                .then(data => {
                    if (data !== null) {
                        // Retrieving student's viva schedule
                        studentVivaSchedule.findOne({ studentId: studentId })
                            .then(data => {
                                if (data !== null) {
                                    resolve({ status: 200, data: data })
                                }
                                else {
                                    reject({ status: 400, data: "Student's schedule does not exist" })
                                }
                            })
                            .catch(err => {
                                reject({ status: 500, error: err })
                            })
                    }
                    else {
                        reject({ status: 400, error: "Student is not registered" })
                    }
                })
                .catch(err => {
                    reject({ status: 500, error: err })
                })
        })
    }

    // Delete schedule of specific student
    this.deleteStudentSchedule = studentId => {
        return new Promise((resolve, reject) => {
            studentVivaSchedule.findOneAndRemove({ studentId: studentId })
                .then(documentFound => {
                    resolve({ status: 202, data: documentFound })
                })
                .catch(err => {
                    reject({ status: 400, error: err })
                })
        })
    }

    // Update schedule of specific student
    this.updateStudentSchedule = (studentId, dateTime, location) => {
        return new Promise((resolve, reject) => {
            studentVivaSchedule.findOneAndUpdate({ studentId: studentId }, { dateTime: dateTime, location: location })
                .then(previousDocument => {
                    resolve({
                        status: 202,
                        message: {
                            previousDocument: previousDocument,
                            updatedDocument: {
                                studentId: studentId,
                                dateTime: dateTime,
                                location: location
                            }
                        }
                    })
                })
                .catch(err => {
                    reject({ status: 400, message: err })
                })
        })
    }
}

module.exports = new adminController()