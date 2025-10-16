import mongoose from 'mongoose';

const productShema = new mongoose.Schema({
    sku : {
        type:String,
        required : true,
        unique:true
    },
    title:{
        type:String,
        required:true
    },
    category : {
        type:String,
        required:true
    },
    brand : {
        type:String,
        required:true
    },
    price : {
        type:Number,
        required:true
    }
},{timestamps:true})

const product = mongoose.model("Product",productShema)

export default product