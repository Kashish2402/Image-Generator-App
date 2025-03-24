import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser"
import {errorHandler} from "./middlewares/error.middleware.js"

const app=express()

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials:true
}))

app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({extended:true,limit:"50mb"}))
app.use(express.static("public"))
app.use(cookieParser())


app.use(errorHandler)
export {app}