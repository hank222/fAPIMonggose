//const express=require('express');
//const path=require('path')
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import {reportRoutes} from '../routes/book.routes.js'
import { userRoutes } from '../routes/user.routes.js'
import { userReportRoutes } from '../routes/userReport.routes.js'

export const startServer =options=>{
    const {port,public_path='public',mongo_url,db_name,pass}=options;

    const app=express();
    app.use(bodyParser.json())
    app.use(express.static(public_path))

    //base de datos
    mongoose.connect(mongo_url,{dbName:db_name})
    const db=mongoose.connection;
    app.use('/user',userRoutes);
    app.use('/reports',reportRoutes);
    
    app.use('/userReport',userReportRoutes);

    app.get('/prueba',(req,res)=>{
        res.json({prueba:"prueba"})
    })

    app.listen(port,()=>{
        console.log(`escuchando en el puerto ${port} y con la url ${mongo_url} ${db_name}`)
    })
}
/*
module.exports={
    startServer
}*/