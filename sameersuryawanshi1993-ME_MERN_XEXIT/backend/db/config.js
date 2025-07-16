import mongoose from "mongoose";
const config = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Mongo Db Connected")
    } catch (error) {
        console.log("Error in Connecting to Mongo_Db",error.message)
    }
}
export default config