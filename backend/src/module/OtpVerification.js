const mongoose=require("mongoose")

const otpSchema=new mongoose.Schema({
    userId:{type:String, required:true},
    otp:{type:String, required:true},
    createdAt:{type:Date, required:true},
    expiresAt:{type:Date, required:true},
},{
    versionKey:false,
    timestamps:true
})
module.exports=mongoose.model("otp",otpSchema)