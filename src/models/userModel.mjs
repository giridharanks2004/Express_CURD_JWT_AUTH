import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    age : {
        type : Number,
        required : true,
    },
    class : {
        type : String,
        required : true,
    }
})

export default mongoose.model("User",userSchema);