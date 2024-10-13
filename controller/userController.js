const express=require("express");
const asyncHandler=require("express-async-handler");
const User=require("../models/userModels.js");  
const Admin=require("../models/adminModel.js");
const bcrypt=require("bcrypt")

//@desc Register a User
//@route POST /api/user/upload
//@access public

const uploadImg=asyncHandler (async (req,res)=>{

    try {
        const username=req.body.username;
        const socialID=req.body.socialID;

        const imageUrls = req.images;

        //Checking if we already have an existing database for that email

        const userAvailable=await User.findOne({username,socialID}) 

        if(!userAvailable){
            const user= await User.create({
                username,
                socialID,  
                images: imageUrls,
            });
            return res.status(200).json({ message: "User Created and Images uploaded successfully" });
        }
        else{

            await User.updateOne(
                { _id: userAvailable._id },
                { $push: { images: { $each: imageUrls } } });
            
            return res.status(200).json({ message: "Images uploaded successfully" });
            
        }
    }
    catch (error) {
        console.error("Error uploading images:", error);
        res.status(500).json({ message: "Server error during image upload." });
      }

});


//@desc Register a admin
//@route POST /api/admin/register
//@access public

const registerUser=asyncHandler (async (req,res)=>{

    const{adminID,password}=req.body;    //15.1

    
    if(!adminID  || !password){
        res.status(400);
        throw new Error("All fields are mandatory");

    }

    console.log("Admin ID: ", adminID);

    if (!adminID.trim()) {
        res.status(400);
        throw new Error("Admin ID cannot be empty or null");
    }
    
    //Checking if we already have an existing database for that email

    const userAvailable=await Admin.findOne({adminID}) //using .findOne we get the same email and if it's true then the user already present
    if(userAvailable){
        res.status(400);
        throw new Error("User already present");
    }


            //Creating a new user
    // Hash password
    const hashedPassword= await bcrypt.hash(password,10);

    console.log("Admin ID to be inserted:", adminID);

    const admin= await Admin.create({
        adminID,
        password:hashedPassword
    });



    //Sending information to the useruser but not sharing the password
    if(admin){
        res.setHeader('Access-Control-Allow-Origin', 'https://sharadformfrontend.netlify.app');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.status(200).json({_id:admin.id});
    }
    else{
        res.status(400);
        throw new Error("User data not valid");
    }

    // res.json({message:"Register the user"});
}); 


//@desc Login a admin
//@route POST /api/admin/login
//@access public
const loginUser=asyncHandler (async (req,res)=>{

    const{adminID,password}=req.body
    if(!adminID || !password){
        res.status(400);
        throw new Error("All fields are mandatory");

    }
    const admin=await Admin.findOne({adminID})
    
    //Comparing the password recieved from the user and password stored in database 
    if(admin && (await bcrypt.compare(password,admin.password))){

        const users = await User.find({}, 'username socialID images');

        res.setHeader('Access-Control-Allow-Origin', 'https://sharadformfrontend.netlify.app');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        res.status(200).json({
            message: "Login successful",
            userData: users
        });

        
    }
    else{
        res.status(401);
        throw new Error("Credentials not valid");
    }

});


module.exports={uploadImg,loginUser,registerUser}
