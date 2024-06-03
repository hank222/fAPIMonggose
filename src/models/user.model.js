import mongoose  from "mongoose";

const userSchema= new mongoose.Schema({
    username:String,
    name: String,
    email:String,
    rol:String
})

export const User=mongoose.model('user',userSchema)