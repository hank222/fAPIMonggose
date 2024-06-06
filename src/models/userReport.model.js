import mongoose from "mongoose";
import {reportSchema} from './report.model.js'
const userReportSchema=new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique:true
      },
    reports:[reportSchema]
})

export const UserReport= mongoose.model('userReports',userReportSchema);