import mongoose from "mongoose";

const schema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    },
    fullname : {
        type : String,
        required : true
    },
    profilePic : {
        type : String,
        default : ''
    },
    gender : {
        type : String,
        enum : ["male", "female"],
    }
})


export const usersModel = mongoose.models.user || mongoose.model('user' , schema)