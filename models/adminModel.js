const mongoose=require("mongoose");


const adminSchema = new mongoose.Schema({

    adminID:{
        type:String,
        unique:[true,"Userid already registered"],
        required:[true,"Please add the username"],
        trim: true
    },

    password:{
        type:String,
        required:[true,"Please add user password"]
    }
  });

module.exports=mongoose.model("Admin",adminSchema);