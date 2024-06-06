import express from 'express';
import {UserReport} from '../models/userReport.model.js';
import { Report } from '../models/report.model.js';

const router=express.Router();

//middleware

const getUserReports=async (req,res,next)=>{
    let userReport;
    const {id}=req.params;

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(404).json({
            message:"El id del reporte no es válido"
        })
    }
    
    try{
        userReport=await UserReport.findById(id);
        console.log(userReport)
        if(!userReport){
            return res.status(404).json({
                message:"El usuario no fue encontrado"
            })
        }
    }catch(error)
    {
        res.status(500).json({
            message:error.message
        })
    }

    res.userReport=userReport;
    next();
}

const getUserReportyByUserName=async (req,res,next)=>{
    let userReport;
    const {username}=req?.body
    
    try{
        userReport=UserReport.find({username:username})
        if(!userReport){
            return res.status(404).json({
                message:"El usuario no fue encontrado"
            })
        }
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
    res.userReport=userReport;
    next();
}

router.get('/:id',getUserReports,async (req,res)=>{
    res.json(res.userReport);
})

router.get('/',async (req,res)=>{
    try{
        const userReports=await UserReport.find();
        
        res.json(userReports);
    }catch(error)
    {
        res.status(500).json(
            {
                message:error.message
            }
        )
    }
})

router.post('/:username',async (req,res)=>{
    const {_id,idM,reportName, client,    
        service, status,    
        bases, periodicty} =req?.body;
    const {username}=req.params;
    
    const reporte = new Report(
        {
            _id,
            idM,
            reportName, 
            client,    
            service, 
            status,    
            bases, 
            periodicty   
        }
    )    
    const userReport=new UserReport({
        username:username,
        reports:reporte
    })
    try{
        const newUserReport=await userReport.save();
        res.json(newUserReport)
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
})

export const userReportRoutes=router;
