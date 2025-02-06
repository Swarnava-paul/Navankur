const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    FirstName : {type : String , required : true},
    LastName : {type : String , required : true},
    Email : {type : String , required : true},
    Password : {type : String , required : true},
    ProfilePic : {type : String},
    Role : {type : String , enum : ['JobSeeker','Employer'] , required : true},
    Industry : {type : String },
    TechStack : {type : String},
    Hobbies : {type : [String]},
    About : {type : String},
    Linkedin : {type : String },
    City:{type : String},
    ResumeLink:{type:String},
    CreatedAt : {type : String , default : () => new Date().toISOString()}
},{versionKey:false});

const UserModel = mongoose.model('User',UserSchema); 

module.exports = UserModel;