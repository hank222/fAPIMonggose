import express from 'express'
import {Report} from '../models/report.model.js'

const router=express.Router();
//middleware
const getReport=async (req,res,next)=>{
    let report;
    const {id}=req.params;

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(404).json({
            message:"El id del reporte no es válido"
        })
    }

    try{
        report=await Report.findById(id);
        if(!report){
            return res.status(404).json({
                message:"El reporte no fue encontrado"
            })
        }
    }catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
    res.report=report;
    next()
}

router.get('/:id',getReport,(req,res)=>{
    res.json(res.report)
})

//obtener todos los reportes
router.get('/',async (req,res)=>{
    try{
        const reportes=await Report.find({});
        console.log('GET ALL', reportes)
        if(reportes.length===0)
            {
                res.status(204).json([])
            }
            res.json(reportes)
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

//crear nuevo reporte

router.post('/',async (req,res)=>{
    const {reportName, client,    
        service, status,    
        bases, periodicty} =req?.body;
    

    if(  !reportName || !client ||   
            !service || !status ||    
            !bases || !periodicty)
            {
                return res.status(400).json({
                    message:"los campos son obligatorios"
                })
            }
    const idM = await generateUniqueID();
    const reporte = new Report(
        {
            idM,
            reportName, 
            client,    
            service, 
            status,    
            bases, 
            periodicty   
        }
    )
    try {
        const newReport =await reporte.save();
        res.status(201).json(newReport)
    }
    catch(error){
        res.status(400).json({
            message:error.message
        })
    }
})

router.put('/:id',getReport,async (req,res)=>{
    try{
        const report=res.report;
        report.status=req.body.status || report.status;
        report.service=req.body.service || report.service;
        report.bases=req.body.bases || report.bases;
        report.periodicty=req.body.periodicty || report.periodicty;

        const updateReport= await report.save();

        res.json(updateReport)
    }catch(error){
        res.status(400).json({
            message:error.message
        })
    }
})

//eliminar reporte
router.delete('/:id',getReport,async (req,res)=>{
    try{
        const report=res.report
        await report.deleteOne({ _id: report._id })
        res.json({
            message:'El reporte fue borrado'
        })
    }catch(error){
        res.status(400).json({
            message:error.message
        })
    }
})

async function generateUniqueID() {
    // Fetch the latest report to get the current count
    const latestReport = await Report.findOne().sort({ _id: -1 });
    console.log(latestReport)
    let count = 1;
    if (latestReport && latestReport.idM) {
        // Extract the numeric part from the latest ID, increment it, and format it
        const latestCount = parseInt(latestReport.idM.split('-')[1], 10);
        count = latestCount + 1;
    }

    // Format the count and return the ID
    return `MX-${count.toString().padStart(6, '0')}`;
}

export const reportRoutes=router;