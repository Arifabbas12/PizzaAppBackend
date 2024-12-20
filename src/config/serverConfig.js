
const dotenv = require('dotenv')
dotenv.config();

const PORT=process.env.PORT;


module.exports = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDNARY_API_KEY: process.env.CLOUDNARY_API_KEY,
    CLOUDNARY_API_SECRET: process.env.CLOUDNARY_API_SECRET

}