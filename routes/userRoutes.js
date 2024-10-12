const express=require("express");
const { uploadImg, loginUser,registerUser} = require("../controller/userController.js");
const upload = require("../middleware/multer/multer.js");
const uploadMultiple = require("../middleware/upload/uploadMultiple.js");
const router=express.Router();

router.post("/upload",upload.array("images"),uploadMultiple,uploadImg)

router.post("/login",loginUser)

router.post("/register",registerUser)



module.exports=router;