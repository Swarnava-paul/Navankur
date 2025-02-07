const express = require('express');
const UserRouter = express.Router();
const UserModel = require('../Models/User');
const checkAuth = require('../Middlewares/Auth');
const checkRole = require('../Middlewares/RoleCheck');

UserRouter.get('/singleApplicant',checkAuth,checkRole,async(req,res)=>{
    try{
        if(!req.query.ApplicantId) return res.status(404).json({message:"Invalid Request"});
        const {ApplicantId} = req.query;
        const singleApplicant = await UserModel.findOne({_id:ApplicantId},{Password:0,Role:0,CreatedAt:0});

        if(!singleApplicant) return res.status(200).json({message:"User Not Found"});

        return res.status(200).json({message:"User Found",Response:true,singleApplicant})
    }catch(error){
        return res.status(500).json({message:"Internal Server Error"});
    }
});

UserRouter.get('/profile',checkAuth,async(req,res)=>{
    try{
      const {id} = req; // from middleware
      const user = await UserModel.findOne({_id:id});
      if(!user) return res.status(404).json({message:"No User Found"});
      const {FirstName} = user;
      return res.status(200).json({message:"User found", Response:true,
      FirstName
      })
    }catch(error){
        res.status(500).json({message:"Internal Server Error"});
    }
});

module.exports = UserRouter;