import mongoose from "mongoose";

let reviewSchema=new mongoose.Schema({
    review:{
        type:String,
        required:[true,"Please Provide the review"]
    },
    pinId:{
        type:String,
        required:[true,"Please Provide the review"]
    },
    userId:{
        type:String,
        required:[true,"Please Provide the review"]
    },
    userName:{
        type:String,
        required:[true,"Please Provide the review"]
    },

})

export default mongoose.model("TicTokAppReviews",reviewSchema)