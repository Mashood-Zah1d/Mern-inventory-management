import Admin from "../model/Admin.model.js";
import asyncFunction from "../utils/asyncFunction.js"
import apiError from "../utils/apiError.js"
import apiResponse from "../utils/apiResponse.js";

const generateTokens = async (userid) =>{
   try {
    const admin = await Admin.findById(userid)
    const refreshToken = await admin.RefreshToken();
    const accessToken = await admin.AccessToken();
 
    admin.refreshToken = refreshToken;
    admin.save({validateBeforeSave:false})
 
    return {refreshToken,accessToken} 
   } catch (error) {
    throw new Error("Issue Generating Tokens");
   }
}
export const register = asyncFunction(async (req,res)=>{
    const {name,username,email,password,secretKey} = req.body;

    if(!(name&&username&&email&&password&&secretKey)){
       throw new apiError(400,"Incomplete Information")
    }
    
    let admin = await Admin.findOne({
        $or:[{username},{email}]
    })
    console.log(admin);
    
    if (admin) {
        throw new apiError(400,"User Already Exist");
    }

    if (secretKey !== process.env.SIGN_UP_KEY) {
        throw new apiError(400,"Secret Key Does not Matches");
    }

    admin = await Admin.create({
        name,username,email,password
    })
    
    const createdAdmin = await Admin.findOne({_id:admin._id})

    res.status(200)
    .json(new apiResponse(200,"User Created",createdAdmin))
});

export const signin = asyncFunction(async (req,res)=>{
    const {email,username,password} = req.body;

    if (!(email || username) && !password) {
        throw new apiError(400,"Incomplete Information");
    }

    const admin = await Admin.findOne({
        $or:[{email},{username}]
    })
    
    console.log(admin);
    
    if(!admin){
     throw new apiError(400,"No Such Admin Exist");
    }
    const isPasswordCorrect = await admin.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        throw new apiError(400,"Incorrect Password");
    }
    
    const loginAdmin = await Admin.findById(admin._id).select("-password -refreshToken")
    const {refreshToken,accessToken} = generateTokens(admin._id);

    res.status(200)
    .cookie("accessToken",accessToken)
    .cookie("refreshToken",refreshToken)
    .json(new apiResponse(200,"Login Succesfull",{accessToken,refreshToken,loginAdmin}))

})

export const logout = asyncFunction(async(req,res)=>{
    
    const admin = await Admin.findByIdAndUpdate(req.user._id,
        {
            $set:{
                refreshToken: undefined
            }
        },
        {
            new:true
        }
    )

    const options = {
        httpOnly:true,
        secure:true
    }

    res.status(200)
    .clearCookie("refreshToken",options)
    .clearCookie("accessToken",options)
    .json(new apiResponse(200,"User Logged Out",{}))
})
