import mongoose from "mongoose"

const schema = new mongoose.Schema({
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    receiver : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    content : {
        type : String,
    },
    image : {
        type : String
    }
},{
    timestamps : true,
    versionKey : false
})

export const messageModel = mongoose.models.message || mongoose.model('message' , schema)