const Mongoose      = require("mongoose");
const Schema = Mongoose.Schema;

/**
 *  Student Schema.
 */
const StudentSchema = new Schema({
    studentId:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    supervisor:{
        type:String,
        required:true
    },
    academicYear:{
        type:Number,
        required:false
    }
});


/**
 *  Company Schema.
 */

const CompanySchema = new Schema({

    companyName:{
        type:String,
        required:true
    },
    spervisorName:{
        type:String,
        required:true
    },
    companyContactNum:{
        type:String,
        required:true
    }


});


// Sameer
let studentVivaSchedule = new Schema({
    studentId: { type: String, required: true },
    dateTime: { type: Date, required: true },
    location: { type: String, required: true }
})

// This schema will be used to store location of the form i-6
let studentForms = new Schema({
    studentId: { type: String, required: true },
    i6FileExtension: { type: String, required: true }
})

Mongoose.model('Student', StudentSchema);
Mongoose.model('StudentVivaSchedule', studentVivaSchedule)
Mongoose.model('StudentForms', studentForms)
Mongoose.model('Company', CompanySchema);

Mongoose.connect('mongodb://localhost:27017/Student', { useNewUrlParser: true }, (err) => {
    if(err){
        console.log(err);
        process.exit(-1);
    }
    console.log("Connected to the DB");
})


module.exports = Mongoose;
