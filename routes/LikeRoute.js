import express from "express"

let router=express.Router()

import {createLike,singleUserLikedPins,currentUserLikedPins,SinglePinLikes,SinglePinSingleUserLikeStatus} from "../controllers/LikeController.js"

router.route("/").post(createLike)
router.route("/singlePinLikes/:pinId").get(SinglePinLikes)
router.route("/currentUserLikes").get(currentUserLikedPins)
router.route("/singleUserLikes/:userId").get(singleUserLikedPins)

router.route("/singlePinSingleUserLikeStatus/:pinId").get(SinglePinSingleUserLikeStatus)

export default router