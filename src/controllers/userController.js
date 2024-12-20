const {registerUser} = require('../services/userService')

async function createUser(req, res){
    console.log("create user controller called");
    console.log(req.body);
    
    try{
        const response = await registerUser(req.body);
        return res.status(201).json({
            message : "Successfully register the user",
            success: true,
            data: response,
            error: {}
        });
    }catch(error){
        return res.status(error.statusCode).json({
            success: false,
            message: error.reason,
            body: {},
            error:error
        })
    }
    
    
}
 module.exports = {
    createUser
 }