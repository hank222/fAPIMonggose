const express=require('express');
const path=require('path')

const startServer =options=>{
    const {port,public_path='public'}=options;

    const app=express();

    app.use(express.static(public_path))
    app.get('*',(req,res)=>{
        res.json({prueba:"prueba"})
    })

    app.listen(port,()=>{
        console.log(`escuchando en el puerto ${port}`)
    })
}

module.exports={
    startServer
}