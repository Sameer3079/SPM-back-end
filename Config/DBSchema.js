const Mongoose = require("mongoose");
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


//Sahiru
const SupervisorSchema = new Schema({
    nic: {
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
    email:{
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

const DailyDiarySchema = new Schema({
    studentId: {
      type: String,
      required: true
    },
    trainingParty: {
      type: String,
      required: true
    },
    startDate : {
      type: Date,
      required:false
    },
    endDate : {
      type: Date,
      required:false
    },
    description : {
      type: String,
      required:false
    }
  
  });

Mongoose.model('Student', StudentSchema);
Mongoose.model('StudentVivaSchedule', studentVivaSchedule)
Mongoose.model('StudentForms', studentForms)
Mongoose.model('Company', CompanySchema);
Mongoose.model('FormI1P1', FormI1P1Schema);
Mongoose.model('DailyDiarySchema', DailyDiarySchema);
Mongoose.model('Supervisor',SupervisorSchema)

Mongoose.connect('mongodb://localhost:27017/Student', { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log(err);
        process.exit(-1);
    }
    console.log("Connected to the DB");
})


module.exports = Mongoose;
