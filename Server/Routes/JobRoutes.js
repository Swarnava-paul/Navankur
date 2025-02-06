const express = require('express');
const JobRouter = express.Router();
const checkAuth = require('../Middlewares/Auth');
const checkRole = require('../Middlewares/RoleCheck');
const JobModel = require('../Models/Job');

const Mongoose = require('mongoose');

JobRouter.post('/postJob',checkAuth,checkRole,async(req,res)=>{
    // JobPostedBy = id of poster user
    try{
        if(!req.body) return res.status(404).json({message:"Invalid Request"});
        const payload = req.body;
        const {id} = req; // from auth middleware
        const newJob = await JobModel.create({...payload,JobPostedBy:id});
        if(!newJob) return res.status(404).json({message:"Failed to Create Job"});
        return res.status(200).json({message:"Job Created Successful",Response:true,jobDetails:newJob});

    }catch(error) {
        res.status(500).json({message:"Internal Server Error"});
    }
}); // role based endpoint for job posting

JobRouter.get('/createdJobs',checkAuth,checkRole,async(req,res)=>{
   try{
      const {id} = req; //from auth middleware
      let Id = new Mongoose.Types.ObjectId(id)
      
      const createdJobs = await JobModel.find({$and:[{JobPostedBy:Id},{
        IsHiringOpen:true}]},{JobTitle:1,JobDescription:1,
      CompanyName:1,IsHiringOpen:1});

      if(createdJobs.length > 0) return res.status(200).json({message:"Created Jobs",createdJobs});
      //else
      return res.status(200).json({message:"Created Jobs",createdJobs})
   }catch(error) {
      return res.status(500).json({message:"Internal Server Error"});
   }
})

module.exports = JobRouter