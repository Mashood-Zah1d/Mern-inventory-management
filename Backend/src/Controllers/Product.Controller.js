import product from "../model/Product.model.js";
import asyncFunction from "../utils/asyncFunction.js"
import apiError from "../utils/apiError.js"
import apiResponse from "../utils/apiResponse.js";
import variant from "../model/Variant.model.js";
import { cache } from "../Config/redis.js";

export const addProduct = asyncFunction(async (req, res) => {
    const { sku, title, category, brand, price, variants } = req.body

    if ([sku, title, category, brand].some((feild) => feild?.trim() === "")) {
        throw new apiError(400, "Please Provide Complete Information");
    }

    if (!price) {
        throw new apiError(400,"Price is Also Required");
        
    }

    if (!variants || variants.length < 1) {
        throw new apiError(400, "Atleast One Variant Required");
    }

    const result = await product.create({ sku, title, category, brand, price });

    if (!result) {
        throw new apiError(500, "Error Inserting The Data ");
    }

    await Promise.all(
    variants.map(async v => {
        v.barcode = Date.now() +Math.floor( (Math.random() * 1000));
        const result = await variant.create({ sku, color: v.color, size: v.size, barcode: v.barcode, stock: v.stock })
        if (!result) {
            throw new apiError(400, "Error Inserting Variant");
        }
    }));

    const v= await variant.find({});
    

    const data = await product.aggregate([
        {
            $match: {
                sku : sku
            }
        },
        {
            $lookup: {
             from: "variants",
             localField:"sku",
             foreignField:"sku",
             as: "Variants" 
            }
        }
    ])
    

    if (!data) {
        throw new apiError(400,"Product Not Found in Database")
    }
    
    cache.set(`products:${sku}`,data[0],3600)

    res.status(200)
    .json(new apiResponse(200,"Product Added SuccesFully Inserted",data[0]));

})

export const getProduct = asyncFunction(async(req,res)=>{
    const {barcode} = req.body;

    if (!barcode) {
        throw new apiError(401,"Data Not Provided");
    }

    const cachedData = await cache.get(`product-barcode:${barcode}`);

    if (cachedData) {
    return res.status(200)
    .json(new apiResponse(200,"Product Founded",cachedData))
    }

    if (!barcode) {
        throw new apiError(400,"Need Barcode To Get Product");
    }

    const Data = await variant.aggregate([
        {
            $match:{barcode : Number(barcode)}
        },
        {
            $lookup:{
                from: "products",
                localField: "sku",
                foreignField:"sku",
                as: "productDetails"
            }
        }
    ])

    if (Data.length === 0) {
  throw new apiError(400, "Variant Does Not Exist");
}

 await cache.set(`product-barcode:${barcode}`,Data,3600)

    res.status(200)
    .json(new apiResponse(200,"Product Founded",Data))
})

export const getAllProduct = asyncFunction(async(req,res)=>{
   const cachedData = await cache.get(`product-all`);
   
   if (cachedData) {
    return res.status(200)
   .json(new apiResponse(200,"All Products With Variant",cachedData))
   }
   const data = await product.aggregate(
    [
        {
        $lookup:{
        from: "variants",
        localField: "sku",
        foreignField:"sku",
        as: "variants"
        }}
    ]
   );
   if (!data) {
    throw new apiError(400,"No Product Found");
   }
    
   await cache.set(`product-all`,data,3600);
   res.status(200)
   .json(new apiResponse(200,"All Products With Variant",data))
})