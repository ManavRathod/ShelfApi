const Book=require('../models/Book')
const Category=require('../models/Category')
exports.createBook=async(req,res)=>{
    try{
        const {id,title,author,year,category}=req.body
        const cat=await Category.findOne({name: category })
        if(!cat) return res.json({msg:"Category Not Found"})
        const book=new Book({id:id,title:title,author:author,year:year,category:cat._id})
        await book.save();
        res.json(book)
    }
    catch(err){
        res.send(err)
    }
}
exports.updateBook=async(req,res)=>{
    try{
        const updated=await Book.findOneAndUpdate({id:req.params.id},req.body,{new: true});
        res.json(updated)
    }
    catch(err)
    {
        res.send(err)
    }
}
exports.viewBook=async(req,res)=>{
    try{
        const book=await Book.aggregate([
            {
                $lookup:{
                    from: 'categories',
                    localField:'category',
                    foreignField:'_id',
                    as:'category',
                }
            },
            {
                $unwind:'$category'
            }
        ])
        if(!book) return res.json({msg:"No Books Found"})
        res.json(book)
    }
    catch(err)
    {
        res.send(err)
    }
}
exports.getBook=async(req,res)=>{
    try{
        const book=await Book.aggregate([
            {
                $match:{id:req.params.id}
            },
            {
                $lookup:{
                    from:'categories',
                    localField:'category',
                    foreignField:'_id',
                    as:'category'
                }
            },
            {
                $unwind:'$category'
            }
        ])
        if(!book) return res.json({msg:"No Book of specified id"})
        else res.json(book)
    }
    catch(err)
    {
        res.send(err)
    }
}
exports.deleteBook=async(req,res)=>{
    try{
        const book=await Book.deleteOne({id: req.params.id})
        if(!book) return res.send("No Book Found of that id")
        else res.json({message: "Book Deleted",data: book})
    }
    catch(err){
        res.send(err)
    }
}
exports.getPaginatedBooks=async(req,res)=>{
    const {page,limit}=req.query;
    try{
        const book=await Book.find()
        .skip((page-1)*limit)
        .limit(parseInt(limit));
        const total=await Book.countDocuments()
        res.json({
            currentPage: parseInt(page),
            totalPages: Math.ceil(total/limit),
            totalBooks: total,
            book
        })
    }
    catch(err)
    {
        res.send(err)
    }
}