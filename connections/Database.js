import mongoose from "mongoose";

function ConnectDB(url){
    return mongoose.connect(url);
}

export default ConnectDB;