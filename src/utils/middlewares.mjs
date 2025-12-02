import { users } from "./data.mjs";
import jwt from "jsonwebtoken";
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