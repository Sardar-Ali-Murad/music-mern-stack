import PinModel from "../models/PinModel.js";
import UserModel from "../models/Auth.js"

import {BadRequestError,UnAuthenticatedError,NotFoundError} from "../errors/index.js"

import { StatusCodes } from "http-status-codes";
import { query } from "express";

const createPin=async (req,res)=>{
    let currentUser=await UserModel.findOne({_id:req.user.userId})

    let {caption,category,vedio}=req.body

    if(!caption || !category){
        throw new BadRequestError("Provide the Fields")
    }

    if(!vedio){
        throw new BadRequestError("Wait For the vedio to upload or upload the vedio")
    }

    let name=currentUser.name

    req.body.userName=name
    req.body.userId=req.user.userId



    let pin=await PinModel.create({...req.body})

    res.status(StatusCodes.CREATED).json({pin})
}

const getAllPins=async (req,res)=>{
    let {category}=req.query
    // console.log(category)
   

   let queryObject={}  

    if(category && category!=="all"){
        queryObject.category=category
    }

    // console.log(queryObject)
  



    let allPins=await PinModel.find(queryObject)

 

    res.status(StatusCodes.OK).json({allPins})
}


const singleUserPins=async (req,res)=>{

    let {id}=req.params

    if(!id){
        throw new BadRequestError('Please Provide the id')
    }

    let pins=await PinModel.find({userId:id})

    let currentUser=await UserModel.findOne({_id:id})

    let image=currentUser.image
    let name=currentUser.name

    res.status(StatusCodes.OK).json({userPins:{pins},image,name})
}


const currentUserPins=async (req,res)=>{
     let pins=await PinModel.find({userId:req.user.userId})
     res.status(StatusCodes.OK).json({pins})
}




const deletePin=async (req,res)=>{
    let {id}=req.params

    if(!id){
        throw new BadRequestError("Please Provide the id")
    }

    let pin=await PinModel.findOne({_id:id})

    if(pin.userId!=req.user.userId){
        throw new UnAuthenticatedError("You are not Authorize to do this")
    }

    await pin.remove()

    res.status(StatusCodes.OK).json({msg:"The pin is deleted successfully"})
}

export {createPin,getAllPins,singleUserPins,deletePin,currentUserPins}