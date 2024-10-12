const mongoose=require("mongoose");


const userSchema = new mongoose.Schema({

    username:{
        type:String,
        required:[true,"Please add the username"]
    },

    socialID:{
        type:String,
        required:[true,"Please add socialID"]
    },
    
    images: {
        type:[String],
        required:[true,"Please add image"]
    }
  });

module.exports=mongoose.model("Users",userSchema);