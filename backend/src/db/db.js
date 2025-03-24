import mongoose from "mongoose"

export const connectDB=async()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/imaZen`)
        console.log(`\n MONGODB Connected Successfully || DBHOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log(`MONGODB connection failed || DBHOST: ${error}`)
        process.exit(1)
    }
}