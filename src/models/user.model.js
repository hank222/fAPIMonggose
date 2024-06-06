import mongoose  from "mongoose";

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique:true
      },
    name: String,
    email:{
        type:String,
        required: true,
        unique:true
      },
    rol:String
})

export const User=mongoose.model('user',userSchema)