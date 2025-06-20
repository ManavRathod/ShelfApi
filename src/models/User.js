const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    name:{ type:String},
    password:{type:String},
    role:{type: String, enum:['admin','viewer','editor'], required: true}
});
module.exports=mongoose.model('User',userSchema);
