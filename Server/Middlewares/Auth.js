const jwt = require('jsonwebtoken');

const checkAuth = async (req,res,next) => {

    const token = req.headers.authorization.split(' ')[1];

   if(!token) return res.status(400).json({message:"No token Provided"});

   jwt.verify(token, process.env.JWT_PRIVATE_KEY , function(err, decoded) {

       if(err) return res.status(500).json({message:'Internal Server Error'});
       const {id} = decoded;
       req.id = id;
       next();
  })
};

module.exports = checkAuth;