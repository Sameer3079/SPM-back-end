let express = require('express')
let router = express.Router()
let adminController = require('./Admin.Controller')

// Schedule viva for student
// Date Format: <YYYY>-<MM>-<DD>T<HH>:<MM>:<SS>.<_MS>Z
router.post('/schedule-session', (req, res) => {
    let studentId = req.body.studentId
    let dateTime = req.body.dateTime
    let location = req.body.location

    adminController.scheduleStudentViva(studentId, dateTime, location)
        .then(data => {
            res.status(data.status).send(data.message)
        })
        .catch(error => {
            res.status(error.status).send(error.message)
        })
})

router.put('/schedules/:scheduleId', (req, res) => {
    adminController.updateStudentSchedule(req.body.studentId, req.body.dateTime, req.body.location)
        .then(data => {
            res.status(data.status).send(data.message)
        })
        .catch(error => {
            res.status(error.status).send(error.message)
        })
})

// Get schedules of all students
router.get('/schedules', (req, res) => {
    adminController.getAllSchedules()
        .then(data => {
            res.status(data.status).send(data.data)
        })
        .catch(error => {
            res.status(error.status).send(error.error)
        })
})

// Get schedule of a specific student
router.get('/schedules/:studentId', (req, res) => {
    adminController.getStudentSchedule(req.params.studentId)
        .then(data => {
            res.status(data.status).send(data.data)
        })
        .catch(error => {
            res.status(error.status).send(error.error)
        })
})

// Delete schedule of specific student
router.delete('/schedules/:studentId', (req, res) => {
    adminController.deleteStudentSchedule(req.params.studentId)
        .then(data => {
            res.status(data.status).send(data.data)
        })
        .catch(error => {
            res.status(error.status).send(error.error)
        })
})

// Update schedule of specific student
router.put('/schedules', (req, res) => {
    adminController.updateStudentSchedule(req.body.studentId, req.body.dateTime, req.body.location)
        .then(data => {
            res.status(data.status).send(data.data)
        })
        .catch(error => {
            res.status(error.status).send(error.error)
        })
})

module.exports = router