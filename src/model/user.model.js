import { Schema, model } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});


const User = model('user', userSchema);

export default User;

export async function findUserByMail(mail) {
    const userEntry = await User.findOne({ email: mail });
    return userEntry;
};

