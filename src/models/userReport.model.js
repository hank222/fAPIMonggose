import mongoose from "mongoose";

const userReportSchema=new mongoose.Schema({
    username:String,
    reports:[String]
})

export const UserReports=new mongoose.model('userReports',userReportSchema);