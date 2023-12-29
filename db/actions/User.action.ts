import { getServerSession } from 'next-auth';
import connectToDB from "../db";
import User from "../models/User.model";


const getUserId = async () => {
    const session = await getServerSession()
   try {
     await connectToDB()
     const user = await User.findOne({
        email: session?.user?.email
     })
     
     const userId = user?._id.toString()
     
     return userId;
   } catch (error:any) {
        console.log("Cannot find user", error);                    
   }
}
export default getUserId