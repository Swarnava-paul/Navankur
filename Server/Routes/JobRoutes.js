const express = require('express');
const JobRouter = express.Router();
const checkAuth = require('../Middlewares/Auth');
const checkRole = require('../Middlewares/RoleCheck');
const JobModel = require('../Models/Job');
const Mongoose = require('mongoose');
const UserModel = require('../Models/User');
const ApplicationModel = require('../Models/Applicants');

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
}); // role based endpoint for view all active jobs created by employer

JobRouter.get('/matchedJobs',checkAuth, async(req,res)=>{
    try{
        const {id} = req;
        const user = await UserModel.findOne({_id:id});
        if(!user) return res.status(404).json({message:"No User Found"});

        const {TechStack} = user;
        const matchedJobs = await JobModel.find({Keywords:TechStack},{Keywords:0});
        if(matchedJobs.length > 0) return res.status(200).json({message:"Matched Jobs Found",Response:true,
            jobsCount:matchedJobs.length,matchedJobs
        })

        return res.status(200).json({message:"No Matched Jobs Found",
        Response:true,jobsCount:matchedJobs.length
       })
    }catch(error){
        res.status(500).json({message:"Internal Server Error"});
    }
});

JobRouter.post('/apply',checkAuth,async(req,res)=>{
    try{
       const {id} = req; // from middleware
       if(!req.body) return res.status(404).json({message:"Invalid Request"});

       const applyToJob = await ApplicationModel.create({...req.body,ApplicantId:id});

       if(!applyToJob) return res.status(404).json({message:"Failed to Apply"});
       return res.status(200).json({message:"Applied Successful",Response:true});
    }catch(error){
       res.status(500).json({message:"Internal Server Error"});
    }
});

JobRouter.get('/viewApplicants',checkAuth,checkRole,async(req,res)=>{
   try{
      const {id} = req; // from middleware
      if(!req.query) return res.status(404).json({message:"Invalid Request"});
      const {jobId} = req.query;

      const applicants = await ApplicationModel.find({JobId:jobId,
        JobPostedBy:id});

      if(applicants.length > 0) return res.status(200).json({message:"Applicants Found",
        Response : true,
        applicants,
        ApplicantsCount:applicants.length,
      })

      return res.status(200).json({message:"No Applicants Found",Response:true,
        ApplicantsCount:applicants.length
      })

   }catch(error) {
      return res.status(500).json({message:"Internal Server Error"});
   }
})
module.exports = JobRouter;