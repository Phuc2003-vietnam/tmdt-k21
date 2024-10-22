import mongoose from "mongoose";
import {} from "dotenv/config";
async function connect() {
    try {
        mongoose.set('strictQuery', false);
        console.log(process.env.MONGO_DB);
        await mongoose.connect(process.env.MONGO_DB);
        console.log("connect successfuly");
    }
    catch(error){
        console.log("connect failure");
    }
}


export default {connect}
