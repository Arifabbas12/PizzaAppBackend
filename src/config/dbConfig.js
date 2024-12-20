const mongoose = require('mongoose')
const serverConfig = require('./serverConfig')

// The below function helps us to cennect to a mongo Db server

async function connectDb(){
    try{
        await mongoose.connect(serverConfig.DB_URL);
        console.log("server is successful connected to mongoDB");
    }
    catch(error){
        console.log("not able to connect to mgDB server");
        console.log(error);
        
    }
}

module.exports = connectDb;