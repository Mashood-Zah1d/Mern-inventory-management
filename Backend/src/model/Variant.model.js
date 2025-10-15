import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
    sku:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Product"
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

const variant = mongoose.model("Variant",variantSchema);

export default variant