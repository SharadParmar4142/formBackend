
const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const asyncHandler = require("express-async-handler");

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.APP_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.APP_CLOUDINARY_API_KEY,
  api_secret: process.env.APP_CLOUDINARY_SECRET_KEY,
});

// Upload multiple images to Cloudinary
const uploadMultiple=asyncHandler(async(req,res,next)=>{

    try{
        const images=req.files;
        console.log(images);
        const imageUrls=[] //storing links after being uploaded to cloudinary

        //Loops through the image and generates link for 
        for (const image of images) {
            const result = await cloudinary.uploader.upload(image.path, {
              resource_type: "image",
            });
            imageUrls.push(result.secure_url);
          }
      
        req.images=imageUrls;
        console.log(req.images);

        next()

    }
    catch(error){
        console.log(error);
        res.status(400).send(`Error at upload.js:: ${error}`)
    }



})
module.exports = uploadMultiple ;
