import { users } from "./data.mjs";
import userModel from "../models/userModel.mjs";
import jwt from "jsonwebtoken";
import { userDTO } from "../DTO/userDTO.mjs";
export const getUserIndexById = (req,res,next) => {
    const userIndex = users.findIndex((user)=>{
        return user.id === parseInt(req.params.id);
    });

    if(userIndex === -1){
        return res.status(404).send(
            {msg: "user not found"}
        )
    }
    req.body.index = userIndex;
    next();
}

export const verifyUser = (req,res,next)=>{
    const token = req.cookies.auth
    if(!token){
        return res.sendStatus(401);
    }

    jwt.verify(token,process.env.JWT_KEY,(err,Data)=>{
        if(err){
           return res.status(401).send({msg : err.message});
        }

        req.userinfo = Data;
        next();
    });

}

export const pagination = (model) => {
    return async (req,res,next) => {
        const page = parseInt(req.query.page) || 1 ;
        const limit = 3;

        const start = (page - 1) * limit;

        try {
            
            const results = {}

            const users = await model.find({}).skip(start).limit(limit);

            results.results = users.map((user) => { return userDTO(user)});

            results.totalDocs = await model.countDocuments();

            results.page = page;

            results.totalpages = Math.ceil(results.totalDocs/limit);

            req.pagination = results;

            next();

        } catch (err) {
            res.status(400).send({msg : err.message});
        }

    }
}