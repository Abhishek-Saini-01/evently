import mongoose from "mongoose";


const connectToDB = async () => {
    if(mongoose.connections[0].readyState) {
        return ;
    }
    
    try {
       const connected = await mongoose.connect(process.env.MONGODB_URI!)
       if(!connected) {
        console.log("error while connecting to Mongodb");
       }

        console.log("Mongodb is connected!!");
        
    } catch (error:any) {
        throw new Error("Error connecting to MongoDB", error);
    }
}

export default connectToDB