const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const StudentSchema = new Schema({
    studentId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

// Sameer
let StudentVivaSchedule = new Schema({
    studentId: { type: String, required: true },
    dateTime: { type: Date, required: true },
    location: { type: String, required: true }
})

const FormI1P1Schema = new Schema({
    studentId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    homePhone: {
        type: String,
        required: true
    },
    mobilePhone: {
        type: String,
        required: true
    },
    emails: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    cgpa: {
        type: String,
        required: true
    }
});
const FormI1P2Schema = new Schema({
    employerName: {
        type: String,
        required: true
    },
    employerAddress: {
        type: String,
        required: true
    },
    superVisorName: {
        type: String,
        required: true
    },
    superVisorTitle: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    NoOfHours: {
        type: String,
        required: true
    },
    tasks: {
        type: String,
        required: true
    },
    learnings: {
        type: String,
        required: true
    },
    externalSupervisorName: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
})

Mongoose.model('Student', StudentSchema);
Mongoose.model('StudentVivaSchedule', StudentVivaSchedule);
Mongoose.model('FormI1P1', FormI1P1Schema);

Mongoose.connect('mongodb://localhost:27017/Student', { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log(err);
        process.exit(-1);
    }
    console.log("Connected to the DB");
})


module.exports = Mongoose;
