const jwt=require("jsonwebtoken")
require("dotenv").config()
const verifyToken=(token)=>{
    return new Promise((resolve, reject)=>{
        jwt.verify(token,process.env.PRIVATE_KEY,(err,decoded)=>{
            if(err){
                reject(err)
            }
            resolve(decoded)
        })
    })

}

module.exports=async (req,res,next)=>{
    try{

        if(!req?.headers?.authorization) return res.status(400).send("Please enter authorization token")
        const bearToken=req?.headers?.authorization
        if(!bearToken.startsWith("Bearer")) return res.status(400).send("Please enter bearer token")
        const token=bearToken.split(" ")[1]
        const user=await verifyToken(token)
        req.user=user
        next()
    }
    catch(err){
        return res.status(400).send("bad request")
    }


}