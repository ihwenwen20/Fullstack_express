import mongoose from "mongoose";

const Roles = mongoose.Schema({
    role: String,
    permissions: [{ type: String }]
})

export default mongoose.model('roles', Roles);