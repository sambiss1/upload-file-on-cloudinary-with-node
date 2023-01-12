const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: `${process.env.NODE_APP_CLOUD_NAME}`,
  api_key: `${process.env.NODE_APP_API_KEY}`,
  api_secret: process.env.NODE_APP_API_SECRET
});

module.exports = cloudinary;
