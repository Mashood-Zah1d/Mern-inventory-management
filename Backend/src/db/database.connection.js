import mongoose from "mongoose";
import {DB_NAME} from "../constant"
import dotenv from "dotenv"
import asyncFuction from "../utils/asyncFunction";
import apiError from "../utils/apiError";
dotenv.config();

const dbConnect = asyncFuction(async () => {
     try {
        const connectionInstance = await mongoose.connect(`${process.env.Mongo_Url}/${DB_NAME}`)
        console.log(`\n Mongo Db Connected At Host: ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log(`Error Connecting DataBase : `,error)
    }
})

export default dbConnect