const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/serverConfig');
const UnAuthorizedError = require('../utils/unAuthorizedError');

async function isLoggedIn(req,res,next){
    const token = req.cookies['authToken'];
    if(!token){
       return res.status(401).json({
        success: false,
        data: {},
        error: "Not authenticated",
        message: "No Auth Token Provided"
       });
    }


    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      if(!decoded){
        throw new UnAuthorizedError();
      }
      // if reached here,then user is authenticated allow them to access them an api
     req.user = {
      email: decoded.email,
      _id: decoded._id,
      role: decoded.role
   }

   next();

    } 
    catch (error) {
      console.log(error);
      return res.status(401).json({
        success: false,
        data: {},
        error: error,
        message: "Invalid Token Provided"
       });
    }


}
   
// This function check , If the Authenticated user is admin or not
// Because we will call isAdmin after isLoggedIn thats why we will receive user details
 function isAdmin(req, res, next){
   const isLoggedInUser = req.user;
   if(isLoggedInUser.role == 'ADMIN'){
     next();
   }
   else{
    res.status(401).json({
      success: false,
      data: {},
      message: "You are not authorized for this action",
      error: {
          statusCode: 401,
          reason: "Unauthorized user"
      }
     })
   }

}

module.exports = {
    isLoggedIn,
    isAdmin
}