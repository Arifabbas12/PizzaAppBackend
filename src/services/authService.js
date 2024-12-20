const { findUser } = require("../repositories/userRepository");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require("../config/serverConfig");

async function loginUser(authDetails){
    const email = authDetails.email;
    const plainPassword = authDetails.passWord;

    // 1. check if there is a registered user with the given email
    const user = await findUser({ email });
    if(!user){
        throw{ message : "No user found with the given email", statusCode: 404};
    }

    // 2. if the user found we need to compare plainIncomingPassword with hashedPassword
      const isPasswordValidate = await bcrypt.compare(plainPassword, user.passWord);
      if(!isPasswordValidate){
        throw{ message: "Invalid password, plz try agail", statusCode: 401};
      }

      const userRole = user.role ? user.role : 'USER'

      // 3. If the password is validated, create a token and return it
      const token = jwt.sign({ email: user.email, _id: user._id, role: userRole}, JWT_SECRET,{
        expiresIn: JWT_EXPIRY
      });

      return token;
}

module.exports = {
    loginUser
}