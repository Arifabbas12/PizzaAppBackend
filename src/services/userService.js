const {findUser, createUser} = require('../repositories/userRepository')
const { createCart } = require('../repositories/cartRepository')
    async function registerUser(userDetail) {
        // it will create a brand new user in the db

        // 1. we need to check if the user with this email and mobile number already exist or not
          const user = await findUser({
            email : userDetail.email,
            mobileNumber: userDetail.mobileNumber
          });

          if(user){
            // we found user
            throw{reason: "User with the given email and mobileNumber already exist", statusCode: 400}
          }

        // 2. If not then create the user in database
        const newUser = await createUser({
            email: userDetail.email,
            passWord: userDetail.passWord,
            firstName: userDetail.firstName,
            lastName: userDetail.lastName,
            mobileNumber: userDetail.mobileNumber
        });

        if(!newUser){
            throw{ reason: 'Something went wrong, connot create user', statusCode: 500}
        }

        await createCart(newUser._id);

        // 3. return the detail of created user
        return newUser;
    }

module.exports = {
  registerUser
};
    
