const express=require("express")
const router=express.Router()
const User=require("..//module/user")
const {body,validationResult}=require("express-validator")
const formatOfError=require("..//util/valadation")
const newToken=require("..//util/token")
const SentMail=require("..//util/SentMail")
const OtpVerification=require("..//module/OtpVerification")
const bcrypt=require("bcrypt")



  
const passport=require("..//config/passport")
const emailChain=()=>body('email').isEmail().withMessage("email is required")
const passwordChain=()=>body("password").isLength({min:6}).withMessage("password must be greater than 6")
passport.serializeUser(({user,token},done)=>{
    done(null,{user,token})

})

passport.deserializeUser(({user,token},done)=>{
    done(null,{user,token})
})



router.post("/register",emailChain(),passwordChain(),async (req,res)=>{
    try{
        const error=validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).send(formatOfError(error.array()).join(","))

        }
        let user=await User.findOne({email:req.body.email}).lean().exec()
        if(user){
            return res.status(400).send("User already exists")
        }
        user=await User.create(req.body)
        const otpData=await SentMail(user._id,user.email,user.name)

        
        return res.status(200).send(otpData)

    }
    catch(err){
        
        return res.status(400).send("bad request")
    }
})
router.post("/login",emailChain(),async (req, res) => {
    try{

        let user=await User.findOne({email:req.body.email})
        if(!user){
            return res.status(400).send("user not found")
        }
        const matchPassword=user.checkPassword(req.body.password)
        if(!matchPassword){
            return res.status(400).send(" passwords do not match")
        }

        const otpData=await SentMail(user._id,user.email,user.name)
        
       

        return res.status(200).send(otpData)

    }
    catch(err){
        return res.status(400).send("bad request")
    }
})
router.post("/verifyotp/:id",async (req,res)=>{
    try{
        const id=req.params.id
        const {otp}=req.body
        if(!otp){
            return res.status(400).send("please provide a otp")
        }
        const user=await OtpVerification.find({userId:id}).lean().exec()

        if(user.length==0){
            return res.status(400).send("user not found")
        }
        const {expiresAt}=user[0]
        const hashOtp=user[0].otp
        console.log(expiresAt,new Date())

        if(expiresAt<new Date()){
            await OtpVerification.deleteMany({userId:id})
            return res.status(400).send("otp has expired")
        }
        else{
            const compareOtp=bcrypt.compareSync(otp,hashOtp)
            if(!compareOtp){
                return res.status(400).send('otp has incorrect')
            }
            else{
                await User.findByIdAndUpdate(id,{verify:true})
                
                await OtpVerification.deleteMany({userId:id})
               
                const token=newToken(user)

                return res.status(200).send({status:"Verified successfully",message:"user email verified successfully",token,user})
            }

        }

    }
    catch(err){
        return res.status(400).send("bad request")
    }
})

router.post("/resendotp",async(req,res)=>{
    try{
        const {userId,email,name}=req.body

        if(!userId || !email || !name){
            return res.status(400).send("userId and email are required")
        }
        else{
            await OtpVerification.deleteMany({userId: userId})
            const otpData=await SentMail(userId,email,name)

            return res.status(200).send({otpData,status:"Otp sent again to your email"})
        }

    }
    catch(err){
        return res.status(400).send("bad request")
    }
})

router.post("/login/forgetpassword",async (req,res)=>{
    try{
        const {email}=req.body
        let user=await User.findOne({email: email}).lean().exec()
        if(!user){
            return res.status(400).send("user not found")
        }
        const userOtp=await SentMail(user._id,user.email,user.name)
        return res.status(200).send(userOtp)

    }
    catch(err){
        return res.status(400).send("bad request")
    }
})
router.patch("/login/forgetpassword/resetpassword/:id",async (req,res)=>{
    try{
        const id=req.params.id
        const {newPassword}=req.body
        const hashPassword=bcrypt.hashSync(newPassword,8)
        const user=await User.findByIdAndUpdate(id,{password:hashPassword})
        if(user){
            return res.status(200).send({status:"your password has been updated"})
        }

    }
    catch(err){
        return res.status(400).send("bad request")
    }
} )

router.get('/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login',successRedirect:"/" }),
  function(req, res) {
    
    return res.status(200).send({user:req.user.user,token:req.user.token})
  });
module.exports=router