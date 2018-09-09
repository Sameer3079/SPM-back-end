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


//Sahiru
const SupervisorSchema = new Schema({
    supervisorId: {
        type : String,
        required: true
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    nic:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    }
})

// Sameer
let StudentVivaSchedule = new Schema({
    studentId: { type: String, required: true },
    dateTime: { type: Date, required: true },
    location: { type: String, required: true }
})

Mongoose.model('Student', StudentSchema);
Mongoose.model('StudentVivaSchedule', StudentVivaSchedule)
Mongoose.model('Supervisor',SupervisorSchema)

Mongoose.connect('mongodb://localhost:27017/Student', { useNewUrlParser: true }, (err) => {
    if(err){
        console.log(err);
        process.exit(-1);
    }
    console.log("Connected to the DB");
})


module.exports = Mongoose;
