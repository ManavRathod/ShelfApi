const Category=require('../models/Category')
exports.createCategory=async(req,res)=>{
    try{
    const category=new Category(req.body)
    await category.save()
    res.json(category)
    }
    catch(err){
        res.send(err)
    }
}
exports.updateCategory=async(req,res)=>{
    try{
        const update=await Category.findOneAndUpdate({name:req.params.name},{$set:{name:req.body.name}},{new:true})
        res.json(update)
    }
    catch(err)
    {
        res.send(err)
    }
}
exports.viewCategory=async(req,res)=>{
    try{
        const view=await Category.find({})
        if(!view) return res.json({msg: "No Category Found"})
        else res.json(view)
    }
    catch(err)
    {
        res.send(err)
    }
}
exports.deleteCategory=async(req,res)=>{
    try{
        const del=await Category.deleteOne({name: req.params.name})
        if(!del) return res.json({message:"Category not exists"})
        else res.send('Category deleted!')
    }
    catch(err)
    {
        res.send(err)
    }
}