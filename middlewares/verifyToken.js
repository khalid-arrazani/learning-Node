  const JWT = require("jsonwebtoken");
  const dotenv = require("dotenv");



  function verifyToken(req, res, next){
    
    const token =req.cookies.token;
    
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



  //verifyToken & Authorize the user 
  function verifyTokenAndAuthorization(req, res, next){
    verifyToken(req, res, ()=>{
          if(req.params.id===req.user.id ||req.user.isAdmin){
           next()
    }else{
           return res.status(403)//forbidden 
      .json({message:"you are not allowed"})
    }
    })
  }



    //verifyToken & admin 
  function verifyTokenAndAdmin(req, res, next){
     
    verifyToken(req, res, ()=>{
          if(req.user.isAdmin){
           next()
    }else{
           return res.status(403)//forbidden 
      .json({message:"you are not allowed,only admin allowed"})
    }
    })
  }

// this is for upload image with token verification
  function verifyTokenForUpload(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
      return res.redirect("/api/auth/login");
    } else {
      try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
      } catch (error) {
        console.log(error);
        return res.redirect("/api/auth/login");
      }
    }}

  module.exports= {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    verifyTokenForUpload
  }