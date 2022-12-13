import mongoose from "mongoose";

let Schema=new mongoose.Schema({
    caption:{
        type:String,
        required:[true,"Provide the Caption"]
    },
    category:{
        type:String,
        enum:["Gaming","Development","Comedy","Food","Dance","Beauty","Animal"],
        required:[true,"Provide the category"]
     
    },
    vedio:{
        type:String,
        required:[true,"Provide the Vedio"]
    },
    userId:{
        type:String,
        required:[true,"Provide the UserId"]
    },
    userName:{
        type:String,
        required:[true,"Provide The User name"]
    }
})

export default mongoose.model("TicTokAppPins",Schema)