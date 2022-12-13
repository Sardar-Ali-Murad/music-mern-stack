import mongoose from "mongoose";

let Schema=new mongoose.Schema({
    pinId:{
        type:String,
        required:[true,"Please Provide the Pin id"]
    },
    userId:{
        type:String,
        required:[true,"Please Provide the UserId"]
    },
    userName:{
        type:String,
        required:[true,"Please Provide the useName"]
    },
    pin:{
        type:Object,
        required:[true,"Please Provide the Pin"]
    },
    like:{
        type:Boolean,
        required:[true]
    }
})

export default mongoose.model("TikTokLikeModel",Schema)