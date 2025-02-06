const mongoose = require('mongoose');

const ApplicantSchema =  new mongoose.Schema({
    JobId : {type : mongoose.Schema.Types.ObjectId , ref: 'Job' , required : true},
    JobPostedBy : {type : mongoose.Schema.Types.ObjectId , ref : 'User' , required : true},
    ApplicantId : {type : mongoose.Schema.Types.ObjectId , ref:'User' ,required : true},
    ApplicantName : {type : String , required : true},
    ApplicantProfilePic:{type : String , required : true},
    Status : {type : String , enum : ['ShortListed','Rejected','Pending'] , default : 'Pending'}
},{versionKey:false});

const ApplicationModel = new mongoose.model('Applicant',ApplicantSchema);

module.exports = ApplicationModel;