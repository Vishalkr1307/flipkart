const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport=require("passport")
require("dotenv").config()
const User=require("..//module/user")
let {v4:uuidv4}=require("uuid")
const newToken=require("..//util/token")

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:2345/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
   

    const user=await User.findOne({email:profile._json.email}).lean().exec()

    if(!user){
        user=await User.create({email:profile._json.email,name:profile._json.name,password:uuidv4()})
    }
    const token=newToken(user)

    return cb(null,{user,token})
   
  }
));

module.exports=passport