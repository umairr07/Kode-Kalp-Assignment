import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true })

userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWTSECRET, {
        expiresIn: "1d",
    });
};

const userModel = mongoose.model("User", userSchema)

export default userModel