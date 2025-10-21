import product from "../model/Product.model.js";
import asyncFunction from "../utils/asyncFunction.js"
import apiError from "../utils/apiError.js"
import apiResponse from "../utils/apiResponse.js";
import variant from "../model/Variant.model.js";

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
    console.log(v);
    

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
    console.log(data[0]);
    

    if (!data) {
        throw new apiError(400,"Product Not Found in Database")
    }


    res.status(200)
    .json(new apiResponse(200,"Product Added SuccesFully Inserted",data[0]));

})

export const getProduct = asyncFunction(async(req,res)=>{
    const {barcode} = req.body;

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


    res.status(200)
    .json(new apiResponse(200,"Product Founded",Data))
})