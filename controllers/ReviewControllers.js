import reviewModel from "../models/ReviewModel.js"

import {BadRequestError,UnAuthenticatedError,NotFoundError} from "../errors/index.js"

import { StatusCodes } from "http-status-codes"

import UserModel from "../models/Auth.js"

import PinModel from "../models/PinModel.js"
import ReviewModel from "../models/ReviewModel.js"

const createReview=async (req,res)=>{
      let {pinId,review}=req.body   

      let pin=await PinModel.findOne({_id:pinId})

      if(!pin){
        throw new BadRequestError("Provide the pinId")
      }

      let currentUser=await UserModel.findOne({_id:req.user.userId})

      let AlreadyExists=await ReviewModel.findOne({pinId:pinId,userId:req.user.userId})

      if(AlreadyExists){
        throw new BadRequestError("Your Review Already exists")
      }

      req.body.userId=req.user.userId
      req.body.userName=currentUser.name

      let Review=await reviewModel.create({...req.body})

      res.status(StatusCodes.OK).json({Review})
}

const singlePinReview=async (req,res)=>{
    let {pinId}=req.params

    if(!pinId){
        throw new BadRequestError("Provide The Pin ID")
    }

   let Reviews=await reviewModel.find({pinId:pinId})

    if(!Reviews){
        throw new NotFoundError("IT has no reviews yet")
    }

    res.status(StatusCodes.OK).json({Reviews})
}

export {createReview,singlePinReview}