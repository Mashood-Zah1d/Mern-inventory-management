import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
    sku:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    barcode : {
        type:Number,
        required:true,
        unique:true
    },
    stock : {
        type:Number,
        required:true,
        min:[0,"Stock Cannot Be In Negative"]
    }
},{timestamps:true})

variantSchema.index({sku:1,color:1,size:1},{unique:true});
const variant = mongoose.model("Variant",variantSchema);

export default variant