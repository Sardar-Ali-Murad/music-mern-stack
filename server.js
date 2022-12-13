import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'
import morgan from 'morgan'
import fileUpload from "express-fileupload"

import Review from "./routes/ReviewRoute.js"
import connectDB from './db/connect.js'
import Auth from "./routes/AuthRoute.js"
import Pins from "./routes/PinRoute.js"
import Authenticate from "./middleware/auth.js"
import Likes from "./routes/LikeRoute.js"
// import Posts from "./routes/PostRoute.js"
// const cloudinary = require('cloudinary').v2

import cloudinary from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

import helmet from 'helmet'

import mongoSanitize from "express-mongo-sanitize"

import xssclean from "xss-clean"
import rateLimit from 'express-rate-limit'

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'



import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import authenticateUser from './middleware/auth.js'
// import Auth from "../routes/AuthRoute.js"


if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

app.use(express.json())
app.use(fileUpload({ useTempFiles: true }));

const __dirname = dirname(fileURLToPath(import.meta.url))
// only when ready to deploy
app.use(express.static(path.resolve(__dirname, './client/build')))

app.use(xssclean())
app.use(mongoSanitize())
app.use(helmet())

app.use("/api/v1/auth",Auth)
app.use("/api/v1/pins",Authenticate,Pins)
app.use("/api/v1/reviews",Authenticate,Review)
app.use("/api/v1/pins/likes",Authenticate,Likes)



app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
