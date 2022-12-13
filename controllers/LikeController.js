import { BadRequestError } from "../errors/index.js"
import UserModel from "../models/Auth.js"
import LikeModel from "../models/LikeModel.js"

import PinModel from "../models/PinModel.js"

import {StatusCodes} from "http-status-codes"

const createLike=async (req,res)=>{
    let {pinId,like}=req.body

    // if(!pinId || !like){
    //     throw new BadRequestError("Provide the like or dislike")
    // }

    let AlreadyLikeFeatures=await LikeModel.findOne({userId:req.user.userId,pinId:pinId})

    if(AlreadyLikeFeatures){
        AlreadyLikeFeatures.like=like

        await AlreadyLikeFeatures.save()

      return  res.status(StatusCodes.CREATED).json({AlreadyLikeFeatures,msg:"This has already a liked feature"})
    } 

    // if(AlreadyLikeFeatures){
    //     // throw new BadRequestError("Cannot Change This Again")
    // }
    if(AlreadyLikeFeatures)return

    

    let pin=await PinModel.findOne({_id:pinId})

    if(!pin){
        throw new BadRequestError("The Pin is not there")
    }

    let currentUser=await UserModel.findOne({_id:req.user.userId})

    req.body.userName=currentUser.name
    req.body.userId=req.user.userId
    req.body.pin=pin

    let Like=await LikeModel.create({...req.body})

    res.status(StatusCodes.CREATED).json({Like})
}

const SinglePinLikes=async (req,res)=>{
    let {pinId}=req.params

    if(!pinId){
        throw new BadRequestError("Provide the PinId")
    }

    let pinLikesNumber=await LikeModel.countDocuments({like:true,pinId})

    res.status(StatusCodes.OK).json({Number:pinLikesNumber})
}

const currentUserLikedPins=async (req,res)=>{
    let likedPins=await LikeModel.find({userId:req.user.userId,like:true})

    res.status(StatusCodes.OK).json({likedPins})
}


const singleUserLikedPins=async (req,res)=>{
    let {userId}=req.params
    // console.log(userId)
    let likedPins=await LikeModel.find({userId:userId,like:true})
    res.status(StatusCodes.OK).json({likedPins})
}

const SinglePinSingleUserLikeStatus=async (req,res)=>{
    let {pinId}=req.params
    
    let pin=await LikeModel.findOne({pinId:pinId,userId:req.user.userId})

    res.status(StatusCodes.OK).json({like:(pin.like!==null && pin.like!==undefined)?pin.like:false})
}

export {createLike,singleUserLikedPins,currentUserLikedPins,SinglePinLikes,SinglePinSingleUserLikeStatus}