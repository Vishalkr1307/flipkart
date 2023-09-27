const express=require("express")
const router=express.Router()
const Product=require("..//module/product")

router.post("",async (req,res)=>{
    try{

        const product=await Product.create(req.body)

        return res.status(200).send(product)

    }
    catch(err){
        return res.status(400).send("bad request")
    }
})
router.get("",async (req,res)=>{
    try{

        const category=req.query.category
        if(category){

            const product=await Product.find({category:category}).lean().exec()
            return res.status(200).send(product)
        }
        else{
            const product=await Product.find().lean().exec()

            return res.status(200).send(product)
        }
        



    }
    catch(err){
        return res.status(400).send("bad request")
    }
})
router.get("/:id",async (req,res)=>{
    try{

        const product=await Product.findById(req.params.id).lean().exec()

        return res.status(200).send(product)

    }
    catch(err){
        return res.status(400).send("bad request")
    }
})
router.patch("/:id",async (req,res)=>{
    try{

        const product=await Product.findByIdAndUpdate(req.params.id,req.body).lean().exec()

        return res.status(200).send(product)

    }
    catch(err){
        return res.status(400).send("bad request")
    }
})
router.put("/:id",async (req,res)=>{
    try{

        const product=await Product.findByIdAndUpdate(req.params.id,req.body).lean().exec()

        return res.status(200).send(product)

    }
    catch(err){
        return res.status(400).send("bad request")
    }
})
router.delete("/:id",async (req,res)=>{
    try{

        const product=await Product.findByIdAndRemove(req.params.id).lean().exec()

        return res.status(200).send(product)

    }
    catch(err){
        return res.status(400).send("bad request")
    }
})

module.exports=router