const express=require("express")
const app= express()
const User=require("./moduleController/userController")
const Product=require("./moduleController/productController")
const session=require("express-session")
const passport=require("./config/passport")
app.use(express.json())
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
app.use(passport.session())

app.use("/auth",User)
app.use("/product",Product)




module.exports=app