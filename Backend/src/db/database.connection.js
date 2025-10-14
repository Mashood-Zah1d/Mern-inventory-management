import mongoose from "mongoose";
import {DB_NAME} from "../utils/constant.js"
import dotenv from "dotenv"
import asyncFuction from "../utils/asyncFunction.js";
import apiError from "../utils/apiError.js";
dotenv.config({path:'../.env'});

const dbConnect = async () => {
     try {
        const connectionInstance = await mongoose.connect(`${process.env.DB_Url}/${DB_NAME}`)
        console.log(`\n Mongo Db Connected At Host: ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log(`Error Connecting DataBase : `,error)
    }
}

export default dbConnect