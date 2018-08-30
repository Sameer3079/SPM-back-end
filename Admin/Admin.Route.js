let express = require('express')
let router = express.Router()
let adminController = require('./Admin.Controller')

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

module.exports = router