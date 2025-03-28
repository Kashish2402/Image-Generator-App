import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
    {
        userId:{
            type: Schema.Types.ObjectId,
            required:true
        },
        plan:{
            type:String,
            required:true,
            default:true
        },
        amount:{
            type:Number,
            required:true
        },
        credits:{
            type:Number,
            required:true
        },
        payment:{
            type:Boolean,
            default:false
        }
    }
    , 
    { 
        timestamps: true 
    }
);

export const Transaction=mongoose.model("Transaction",transactionSchema)
