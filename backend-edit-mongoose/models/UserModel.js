import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const Users = mongoose.Schema({
    uuid: {
        type: String,
        default: uuidv4,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        // lowercase: true,
        // unique: true,
        // validate(value) {
        //     if (!validator.isEmail(value)) {
        //         throw new Error("Please provide the valid email address");
        //     }
        // },
    },
    password: {
        type: String,
        required: true,
        // trim: true,
        // minLength: 8,
    },
    role: {
        type: String,
        required: true,
    },
    // phone: {
    //     type: Number,
    //     required: true,
    //     unique: true
    // },
    // tokens: [{
    //     token: {
    //         type: String,
    //         required: true
    //     }
    // }]
    // cart: [{ type: Schema.Types.ObjectId, ref: 'products' }],
    // roles: [{ type: String, ref: 'roles' }],
}, {
    timestamps: true
});

export default mongoose.model('users', Users);