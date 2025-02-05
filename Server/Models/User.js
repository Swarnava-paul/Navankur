const mongoose = require('mongoose');

const UserSchema = new mongoose.Schea = ({
    FirstName : {type : String , required : true},
    LastName : {type : String , required : true},
    Email : {type : String , required : true},
    Password : {type : String , required : true},
    ProfilePic : {type : String , required : true},
    Role : {type : String , enum : ['JobSeeker','Employer'] , required : true},
    Industry : {type : String },
    TechStack : {type : [String]},
    Hobbies : {type : [String]},
    About : {type : String},
    Linkedin : {type : String},
    City:{type : String},
    CreatedAt : {type : String , default : () => new Date().toISOString()}
});

const UserModel = mongoose.model('User',UserSchema); 

module.exports = UserModel;