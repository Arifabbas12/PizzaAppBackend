const user = require('../schema/userSchema');

    async function findUser(parameters){
        try {
            const response = await user.findOne({...parameters});
        return response;
        } 
        catch (error) {
            console.log(error);
            
        }
    }

    async function createUser(userDetail){

        try {
            const response = await user.create(userDetail);
        return response;
        } 
        catch (error) {
            console.log(error);
        }
        
    }


module.exports = {
    findUser,
    createUser
};