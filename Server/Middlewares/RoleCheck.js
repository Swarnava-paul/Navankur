const UserModel = require('../Models/User');

const checkRole = async (req,res,next) => {
   // extracts id from request
   const { id } = req;
   const user = await UserModel.findOne({_id:id});

   if(!user) return res.status(400).json({message:"No User"});

   const {Role} = user;

   if(Role !== 'Employer') return res.status(401).json({message:"Unauthorized Access"});
   
   next();

};

module.exports = checkRole;