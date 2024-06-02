import mongoose  from "mongoose";

const bookSchema=new mongoose.Schema({
    idM:{
      type:String,
      required: true,
      unique:true
    },
    reportName: {
        type: String,
        required: true
      },
    client: {
        type: String,
        required: true
      },    
    service:{
        type: [String],
        required: true
      },
    status: {
        type: String,
        required: true
      },    
    bases: {
        type: [String],
        required: true
      },
    periodicty: {
        type: String,
        required: true
      }    
})

export const Report=mongoose.model('report', bookSchema)