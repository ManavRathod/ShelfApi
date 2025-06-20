const jwt=require('jsonwebtoken')
const authenticate=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")) return res.json({msg:"Access Token Missing"})
    const token=authHeader.split(" ")[1]
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded;
        next()
    }
    catch(err)
    {
        res.send(err)
    }
}
const authorize=(...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.send("access denied")
        }
        next()
    }
}
module.exports={authenticate,authorize}