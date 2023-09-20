const nodemailer=require("nodemailer")
require("dotenv").config()
const MailGen=require("mailgen")
const OtpVerification=require("..//module/OtpVerification")
const bcrypt=require("bcrypt")

module.exports=async(id,email,name)=>{
    try{

        
        const transport=await nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.GMAIL_EMAIL,
                pass:process.env.GMAIL_PASSWORD
                
            }
        })
        const otp=Math.floor(1000+Math.random()*9000)
        const hashOtp=bcrypt.hashSync(otp.toString(),8)
        
        const newOtpVerification= await OtpVerification({
            userId:id,
            otp:hashOtp,
            createdAt:new Date(),
            expiresAt:new Date().getTime()+3600 *1000,
        })
        await newOtpVerification.save()
        const mailGenerator=new MailGen({
            theme:'default',
            product:{
                name:'Project-1',
                link:"http://localhost:4000"
    
            }
        })
       let emailData={
        body:{
            name:name,
            intro:'welcome to project-1! we\'re very excited to have on board',
            action:{
                instructions:`to get started wit MailGene, please enter otp`,
                button:{
                    color:"green",
                    text:otp
    
                }
            },
            outro:'Need help, or have question? just reply to this email,we\'d love to help'
        }
       }
       const emailBody= await mailGenerator.generate(emailData)
      const emailText=await mailGenerator.generatePlaintext(emailData)
    

    

        
        const info=await transport.sendMail({
            from:process.env.GMAIL_EMAIL,
            to:email,
            subject:"Verification for email",
            text:emailText,
            html:emailBody

        })
        
        
        
        return {status:`opt send to ${email}`,userId:id,email:email,name:name}
        

        
        
    }
    catch(err){
        console.log(err)
        return err
        
    }
}