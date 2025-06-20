const User=require('../models/User')
const jwt=require('jsonwebtoken')
exports.createUser=async(req,res)=>{
    try{
        const user=new User(req.body)
        await user.save()
        res.json(user)
    }
    catch(err)
    {
        res.send(err)
    }
}
exports.login=async(req,res)=>{
    try{
        const {name, password}=req.body;
        const user=await User.findOne({name:name})
        if(!user || user.password !==password) return res.status(401).json({message:"Invalid Credentials"})
        
        const token=jwt.sign({name: user.name,role: user.role},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRY})
        res.status(200).json({token})
    }
    catch(err)
    {
        res.send(err)
    }
}