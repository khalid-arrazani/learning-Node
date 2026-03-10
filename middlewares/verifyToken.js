  const JWT = require("jsonwebtoken");
  const dotenv = require("dotenv");

  function verifyToken(req, res, next){
    const token =req.headers.token;
    if(token){
    try{
        const decoded = JWT.verify(token,process.env.JWT_SECRET_KEY)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({message:"invalid token"})
    }
    } else{
        res.status(401).json({message:"no token provided"})
        }
  }

  module.exports= {
    verifyToken,
  }