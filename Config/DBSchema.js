const Mongoose      = require("mongoose");
const Schema = Mongoose.Schema;

const StudentSchema = new Schema({
    name:{
        type:String,
        required:true
    }
});

Mongoose.model('Student', StudentSchema);

Mongoose.connect('mongodb://localhost:27017/Student', { useNewUrlParser: true }, (err) => {
    if(err){
        console.log(err);
        process.exit(-1);
    }
    console.log("Connected to the DB");
})


module.exports = Mongoose;
