const mongoose = require('mongoose');

const ApplicantSchema =  new mongoose.Schema({
    JobId : {type : mongoose.Schema.Types.ObjectId , ref: 'Job' , required : true},
    JobPostedBy : {type : mongoose.Schema.Types.ObjectId , ref : 'User' , required : true},
    ApplicantId : {type : String , required : true},
    ApplicantName : {type : String , required : true},
    ApplicantProfilePic:{type : String , required : true},
    status : {type : String , enum : ['ShortListed','Rejected'] ,required : true}
})

const ApplicationModel = new mongoose.model('Applicant',ApplicantSchema);

module.exports = ApplicationModel;