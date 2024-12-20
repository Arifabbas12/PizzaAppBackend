const { CLOUDINARY_CLOUD_NAME, CLOUDNARY_API_KEY, CLOUDNARY_API_SECRET } = require('./serverConfig')

const cloudinary = require('cloudinary').v2

// configuring cloudinary

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDNARY_API_KEY,
    api_secret: CLOUDNARY_API_SECRET
});

module.exports = cloudinary;