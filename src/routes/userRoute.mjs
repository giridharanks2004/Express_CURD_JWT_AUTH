import { Router } from "express";
import { users } from "../utils/data.mjs";
import { getUserIndexById, pagination } from "../utils/middlewares.mjs";
import { verifyUser } from "../utils/middlewares.mjs";
import { userValidationSchema } from "../utils/validation.mjs";
import { checkSchema, validationResult , matchedData } from "express-validator";
import UsersDB from "../models/userModel.mjs";
import { userDTO } from "../DTO/userDTO.mjs";

const router = Router();

// getting all the users or list of users
// http://localhost:3000/api/users?page=4&limit=3
router.get('/api/users',pagination(UsersDB), async (req,res)=>{
    const filter = req.query.filter;
    const search = req.query.search;
    return res.status(200).send(req.pagination);
});


// saving a new record in users
router.post('/api/users',verifyUser,checkSchema(userValidationSchema),async (req,res)=>{
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).send({...result.array()});
    }
    const data = matchedData(req);

    UsersDB.create(data)
        .then((user)=>{
            return res.status(201).send(userDTO(user));
        })
        .catch((err)=>{
            return res.status(400).send(err.message);
        });
});

//getting a sepecific user by id
router.get('/api/users/:id',verifyUser,(req,res)=>{
    const id = req.params.id
    if(!id){
        return res.status(400).send({
            msg : "this is not a correct id passed please verify ur request"
        });
    }
    
    UsersDB.findById(id)
                .then((data)=>{
                    return res.status(200).send(userDTO(data));
                })
                .catch(()=>{
                    return res.status(404).send({msg : "user not found "});
                });
});

// complete updation of record 
router.put('/api/users/:id',checkSchema(userValidationSchema),verifyUser,(req,res)=>{
    console.log(req.body);
    const update = req.body;
    if(!req.params.id){
        return res.status(400).send({msg : "not found"});
    }
    UsersDB.findByIdAndUpdate(req.params.id,matchedData(req),{new : true})
            .then((updatedata)=>{
                return res.status(200).send(updatedata);
            })
            .catch((err)=>{
                return res.status(400).send(err.message);
            });

});


// deleting a record from the list
router.delete('/api/users/:id',verifyUser,(req,res)=>{
    UsersDB.findByIdAndDelete(req.params.id)
           .then((data)=>{
                if(!data){
                    return res.sendStatus(404);
                }
                return res.sendStatus(204);
           })
           .catch((err)=>{
            console.log("hi");
            return res.status(404).send({msg : err.message})});
});


//partial update
router.patch('/api/users/:id',verifyUser,checkSchema(userValidationSchema),(req,res)=>{
    if(!req.params.id){
        return res.status(400).status(
            {
                msg : "check your request once for a proper id"
            }
        );
    }

    UsersDB.findByIdAndUpdate(req.params.id,matchedData(req),{ new : true})
        .then((updatedata)=>{
            return res.status(200).send({
                msg : "partial updatesucces",
                data : updatedata
            });
        })
        .catch((err)=>{
            return res.status(400).send({msg : err.message});
        })


});


export default router;