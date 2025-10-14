import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import adminRouter from './Routes/Admin.Routes.js' 

const app = express();
app.use(urlencoded({extended:true,limit:"16kb"}))
app.use(express.json({limit:"16kb"}))
app.use(cookieParser())
app.use(cors({
    origin:process.env.Origin,
    credentials:true
}))

app.use("/api/v1/admin",adminRouter)


export default app
