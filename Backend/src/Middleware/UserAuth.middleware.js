import apiError from '../utils/apiError.js';
import asyncFuction from '../utils/asyncFunction.js'
import Admin from "../model/Admin.model.js";
import jwt from 'jsonwebtoken';
 const verify = asyncFuction(async(req,res,next)=>{
    const token = req.cookie?.accessToken || req.header("Authorization")?.replace("Bearer", "")
    if (!token) {
        throw new apiError(400,"Unauthorized User");
    }
    const decodeToken = jwt.verify(token,ACCESS_TOKEN_SECRET_KEY)

    const admin = await Admin.findById({_id:decodeToken._id}).select("-password -refreshToken")

    if (!admin) {
        throw new apiError(400,"User Not Found");
    }

    req.admin = admin
    next();
})
export default verify