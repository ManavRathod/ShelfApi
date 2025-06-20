const mongoose=require('mongoose')
const bookSchema=new mongoose.Schema({
    id:{ type:String, unique: true, required: true},
    title:{type:String},
    author:{type:String},
    year:{type:Number},
    // category:{type:String}
    category:{type:mongoose.Schema.Types.ObjectId, ref:'Category'}
});
module.exports=mongoose.model('Book',bookSchema);
