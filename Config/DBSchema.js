const Mongoose      = require("mongoose");
const Schema = Mongoose.Schema;

const StudentSchema = new Schema({
    studentId: {
        type: String,
        required: true
    },
    name:{
        type:String,
        required:true
    }
});

// Sameer
let StudentVivaSchedule = new Schema({
    studentId: { type: String, required: true },
    dateTime: { type: Date, required: true },
    location: { type: String, required: true }
})

Mongoose.model('Student', StudentSchema);
Mongoose.model('StudentVivaSchedule', StudentVivaSchedule)

// Mongoose.connect('mongodb://localhost:27017/Student', { useNewUrlParser: true }, (err) => {
Mongoose.connect('mongodb://roo:sameer123@ds237192.mlab.com:37192/spm-project', { useNewUrlParser: true }, (err) => {
    if (err) {
        // console.log(err);
        Mongoose.connect('mongodb://localhost:27017/Student', { useNewUrlParser: true }, (localErr) => {
            if (localErr) {
                // console.log(localErr);
                process.exit(-1);
            }
            else {
                console.log("Connection to Remote Database Failed\nConnected to local DB");
            }
        })
    }
    else {
        console.log("Connected to Remote Database");
    }
})


module.exports = Mongoose;
