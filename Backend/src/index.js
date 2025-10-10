import app from "./app"
import dbConnect from "./db/database.connection"
import dotenv from "dotenv"
dotenv.config()

dbConnect()
.then(()=> {
  app.listen(process.env.PORT || 8000 ,()=> {
      console.log(`Server Is Running On Port : ${process.env.PORT}`);
    })
})
.catch(err=>{
    console.log(`Mongo DB Error Failed:`,err);
})