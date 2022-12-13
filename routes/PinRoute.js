import express from "express"
let router=express.Router()

import {createPin,getAllPins,singleUserPins,deletePin,currentUserPins} from "../controllers/PinController.js"
import uploadVedio from "../controllers/UploadVedio.js"

router.route("/").post(createPin).get(getAllPins)
router.route("/singleUserPins/:id").get(singleUserPins)
router.route("/currentUserPins").get(currentUserPins)
router.route("/delete/:id").delete(deletePin)
router.route("/upload").post(uploadVedio)

export default router
