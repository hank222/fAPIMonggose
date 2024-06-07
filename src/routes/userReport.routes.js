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
    const {username}=req.params
    
    try{
        userReport=await UserReport.find({username:username})
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
    console.log(res.userReport)
    res.json(res.userReport);
})
router.get('/username/:username',getUserReportyByUserName,async (req,res)=>{
    console.log(res.userReport)
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

router.put('/:username',getUserReportyByUserName,async (req,res)=>{
    const {_id,idM,reportName, client,    
        service, status,    
        bases, periodicty} =req?.body;
    const {username}=req.params;
    let userReport;

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
    console.log(res.userReport)
    if(!res.userReport)
    {
        userReport=new UserReport({
                username:username,
                reports:reporte
            })
    }
    else{
        userReport=res.userReport;
        const reportes=userReport[0].reports
        reportes.push(reporte)
    }
    try{
        const newUserReport=await userReport[0].save();
        res.json(newUserReport)
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
})

export const userReportRoutes=router;
