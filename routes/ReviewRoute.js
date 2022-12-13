import express from "express"

let router=express.Router()

import {createReview,singlePinReview} from "../controllers/ReviewControllers.js"

router.route("/").post(createReview)
router.route("/:pinId").get(singlePinReview)

export default router