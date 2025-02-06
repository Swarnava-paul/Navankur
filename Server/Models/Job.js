const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new mongoose.Schema({
    JobPostedBy : {type : Schema.Types.ObjectId , ref : 'User' , required : true},
    JobTitle:{type:String,required:true},
    JobDescription:{type : String , required : true},
    Qualification:{type:String,required:true},
    Experience:{type:String,required:true},
    Keywords:{type : [String] , required : true},
    JobLocation:{type : String ,required: true},
    Industry : {type : String ,required: true},
    CompanyName:{type:String,required:true},
    CompanyWebsite:{type : String ,required: true},
    CompanyEmail:{type : String ,required: true},
    SalaryRange : {type : String ,required: true},
    IsHiringOpen : {type : Boolean , default : true},
    JobPostedDate : {type : String , default : () => new Date().toISOString()}
},{versionKey:false});

const JobModel = new mongoose.model('Job',JobSchema);
module.exports = JobModel;