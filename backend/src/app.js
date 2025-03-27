import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser"
import {errorHandler} from "./middlewares/error.middleware.js"

const app=express()

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials:true
}))

app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({extended:true,limit:"50mb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRoutes from "./routes/user.routes.js"
import imageRoutes from './routes/image.routes.js'

app.use("/api/v1/users",userRoutes)
app.use("/api/v1/images",imageRoutes)


app.use(errorHandler)
export {app}