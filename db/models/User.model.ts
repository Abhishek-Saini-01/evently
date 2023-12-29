import { Schema, model, models } from "mongoose";

const userShema = new Schema({
    fullName:{
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
    }   
},{
    timestamps: true
})

const User = models.User || model('User', userShema);
export default User;