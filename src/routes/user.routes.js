import express from 'express'
import {User} from '../models/user.model.js'

const router=express.Router();

//midleware
const getUser= async (req,res,next)=>{
    let user;
    const {id}=req.params;

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(404).json({
            message:"El id del reporte no es válido"
        })
    }
    
    try{
        user=await User.findById(id);
        if(!user){
            return res.status(404).json({
                message:"El usuario no fue encontrado"
            })
        }
        
    }catch(error){
        return res.status(500).json({
            message:error.message
        })
    }

    res.user=user;
    next()
}

router.get('/:id',getUser,(req,res)=>{
    res.json(res.user);
})

router.get('/',async (req,res)=>{
    
    try{
        const user=await User.find();
        
        res.json(user)
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

router.delete('/:id',getUser,async (req,res)=>{
    try{
        const user =res.user;
        await user.deleteOne({_id:user.id});
        res.json({
            message: `El usuario ${user.name} fue eliminado`
        })
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
})

router.post('/',async (req,res)=>{
    const {username, name, email, rol}=req?.body;

    if(!username || !name || !email || !rol)
        {
            res.status(500).json({
                message:"Los campos son obligatorios"
            })
        }
    
    const user=new User({
        username,
        name,
        email,
        rol
    })
    try{
        const newUser=await user.save()
        res.status(201).json(newUser)
    }catch(error)
    {
        res.status(500).json({
            message:error.message
        })
    }
})

router.patch('/:id',getUser,async (req,res)=>{
    const {username, name, email, rol}=req?.body;
    
    try{
        const user=res.user;
        user.username=username || user.username;
        user.name=name || user.name;
        user.email =email || user.email;
        user.rol=rol || user.rol;

        const updateUser=await user.save();
        res.json(updateUser)

    }catch(error)
    {
        res.status(500).json({
            message:error.message
        })
    }
})

export const userRoutes=router;