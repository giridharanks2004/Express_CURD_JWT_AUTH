import mongoose from "mongoose";

const authSchema = mongoose.Schema({
    username : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    }
});

const auth = mongoose.model("Auth",authSchema); 


export default auth;