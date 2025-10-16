import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import adminRouter from './Routes/Admin.Routes.js' 
import productRouter from './Routes/Product.Routes.js' 

const app = express();
app.use(urlencoded({extended:true,limit:"16kb"}))
app.use(express.json({limit:"16kb"}))
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use("/api/v1/admin",adminRouter)
app.use("/api/v1/product",productRouter)


export default app
