const express = require('express');
const AuthRouter = express.Router();
const {randomInt} = require('node:crypto');
const { verifyOTP, deleteOTP , storeOTP} = require('../Modules/Otp');
const sendEmail = require('../Modules/Email');
const UserModel = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

AuthRouter.post('/register', async (req, res) => {
    try{
        if(!req.query.otp) return res.status(400).json({message : 'Invalid Registration Request'});
        if(!req.body) return res.status(400).json({message : 'Invalid Request'});
        const {otp} = req.query;
        const {Email,Password} = req.body;
        // check that otp is correct from redis if then also grant register request
        const checkOtp = await verifyOTP(Email,parseInt(otp,10));
        if(checkOtp === true) {
            // has the password
            const hashedPassword = bcrypt.hashSync(Password, 5);
            const user = await UserModel.create({...req.body,Password:hashedPassword});

            if(!user) return res.status(500).json({message:"Try again Later"});

            await deleteOTP(Email); // after check delete that otp from server
            res.status(200).json({message :"Registration Successful"})
        }
        return res.status(404).json({message:"Wrong Otp"})
        // else reject request
    }catch(err) {
       res.status(500).json({message:"Internal Server Error"});
    }
});

AuthRouter.post('/otp', async(req,res) => {
   try{
    if(!req.query.email) return res.status(400).json({message : 'Invalid Email'});
    const email = req.query.email;
    const otp = randomInt(1120,4478);
    // first we need to send this otp in users provided email
    // then stores in redis
    await storeOTP(email,otp);
    await sendEmail(email,otp)
    res.status(200).json({message:"Otp Sent To Email",action:true});
   }catch(err) {
    res.status(500).json({message:"Internal Server Error"});
   } 
});

AuthRouter.get('/verifyOtp' , async(req,res)=>{
    try{
        if(!req.query.otp || !req.query.email) return res.status(400).json({message : "Invalid Request"});
        // else we check given otp with our redis if true then return true else false
        const {otp,email} = req.query;
        const checkOtp = await verifyOTP(email,parseInt(otp,10));
        if(checkOtp === true) {
            return res.status(200).json({message:"Otp Matched",result:true});
        }
        return res.status(400).json({message:"Otp Not Matched",result:false})
    }catch(error) {
        res.status(500).json({message:"Internal Server Error"});
    }
});

AuthRouter.post('/login', async(req,res)=>{
    try{
        if(!email || password ) return res.status(400).json({message:"Invalid Request"});

        const {email,password} = req.body;

        const user = await UserModel.findOne({Email:email})

        if(!user) return res.status(400).json({message:"No User Found"});

        const plainTextPassword = bcrypt.compareSync(password,user.Password);
        if(!plainTextPassword) return res.status(404).json({message:"Wrong Password"})
        const {_id} = user;
    
        jwt.sign({ id : _id },process.env.JWT_PRIVATE_KEY, function(err, token) {
            if(err) throw new Error(err);
            else {
                return res.status(200).json({message:"Login Successful",token});
            }
        })
    }catch(error) {
        res.status(500).json({message:"Internal Server Error"});
    }
})


module.exports = AuthRouter;