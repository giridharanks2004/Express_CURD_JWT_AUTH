import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { users } from "./utils/data.mjs";
import authRoute from "./routes/authRoute.mjs"
import mongoose from "mongoose"
import bycrpt from "bcrypt";

dotenv.config();

const PORT = 3000;

import userRoute from "./routes/userRoute.mjs"

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser(process.env.KEY));
app.use(authRoute);
app.use(userRoute);

app.listen(PORT,()=>{
    console.log("server started at port "+PORT);
});

mongoose.connect(process.env.DB_URI)
    .then((con)=>console.log("DB connected at "+con.connection.host))
    .catch((err)=>console.log(err.message));



//root endpoint intialisation
app.get('/',(req,res)=>{
    
    return res.status(200).send({
        msg : "hey changes from new feature branch hello there again"
    })
});




