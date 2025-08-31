import mongoose from "mongoose";
import user from "./users.model.js";

const blogSchema = mongoose.Schema({
    title : {
        type:String,
        required:true
    },
    body : {
        type:String,
        required:true
    },
    coverImage : {
        type:String,
        required:false
    },
    createdBy : {
        type:mongoose.Schema.Types.ObjectId,
        ref : user,
        required:true
    }
},{timestamps:true})

const blog = mongoose.model("blog",blogSchema);
export default blog;