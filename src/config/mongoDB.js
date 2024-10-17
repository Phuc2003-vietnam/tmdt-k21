import mongoose from "mongoose";
import {} from "dotenv/config";
async function connect() {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_DB);
        console.log("database connect successfuly");
    }
    catch(error){
        console.log("database connect failure");
    }
}


export default {connect}
