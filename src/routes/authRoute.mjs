import { Router } from "express";
import { checkSchema, validationResult , matchedData } from "express-validator";
import { authValidation } from "../utils/validation.mjs";
import { users } from "../utils/data.mjs";
import bycrpt from "bcrypt";
import AuthDB from "../models/AuthModel.mjs"
import { authDTO } from "../DTO/authDTO.mjs";
import jwt from "jsonwebtoken"
const router = Router();

router.post('/api/register',checkSchema(authValidation), async (req,res)=>{
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).send({
            msg : result.array()
        });
    }
    const reqdata = matchedData(req);
    try {

        const user = await AuthDB.findOne({username : reqdata.username});

        if(user){
            return res.status(400).send({msg : "username already exists please try with a unique username"});
        }

        const encryptPass = await bycrpt.hash(reqdata.password,10);

        const authData = {
            username : reqdata.username,
            password : encryptPass
        }

        const saved = await AuthDB.create(authData);
        console.log(saved);
        return res.status(201).send(authDTO(saved));


        
    } catch (error) {
        res.status(400).send(err.message);
    }


})
    

router.post('/api/login',checkSchema(authValidation), async (req,res)=>{

    const result = validationResult(req);

    if(!result.isEmpty()){
        return res.status(400).send({
            msg : result.array()
        });
    }

    const reqdata = matchedData(req);

    try {

       const user = await AuthDB.findOne({username : reqdata.username });
       if(!user){
            return res.status(404).send({
                msg : "username not found"
            })
       }
       const authorised = await bycrpt.compare(reqdata.password,user.password);
       if(!authorised){
            return res.status(401).send({
                msg : "password is incorrect try again later"
            });
       }

        const token = jwt.sign({username : user.username},process.env.JWT_KEY,{expiresIn: "3h"});

        res.cookie("auth",token);

        return res.status(200).send(
            {
                msg : "logged in sucessfully",
                token : token
            }
        )

    } catch (err) {
         return res.status(400).send({
                msg : err.message
            });
    }
    
});

export default router;