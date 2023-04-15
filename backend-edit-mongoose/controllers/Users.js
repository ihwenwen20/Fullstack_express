import User from "../models/UserModel.js";
import argon2 from "argon2";

// Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, "uuid name email role"); // Ambil data uuid, name, email, dan role dari semua user dari MongoDB
        res.status(200).json(users); // Kirim response dengan data semua user
    } catch (error) {
        res.status(500).json({ error: error.message }); // Kirim response error jika terjadi kesalahan
    }
};

// Get user by ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: "User tidak ditemukan" });
        }
        res.status(200).json(user); // Kirim response dengan data user yang ditemukan
    } catch (error) {
        res.status(500).json({ error: error.message }); // Kirim response error jika terjadi kesalahan
    }
};

// Create new user
export const createUser = async (req, res) => {
    const { name, email, password, confPassword, role } = req.body;
    if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
    const hashPassword = await argon2.hash(password);
    try {
        const newUser = new User({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        });
        await newUser.save(); // Menggunakan method save pada instance newUser untuk menyimpan data user ke MongoDB
        res.status(201).json({ msg: "Register Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// Update user
export const updateUser = async (req, res) => {
    const { name, email, password, confPassword, role } = req.body;
    const user = await User.findOne({ _id: req.params.id }); // Cari user berdasarkan uuid dari parameter URL

    if (!user) {
        return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    let hashPassword;
    if (password === "" || password === null) {
        hashPassword = user.password;
    } else {
        hashPassword = await argon2.hash(password); // Hash password baru menggunakan argon2
    }

    if (password !== confPassword)
        return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });

    try {
        const updateduser = await User.updateOne(
            { _id: req.params.id }, // Cari user berdasarkan uuid dari parameter URL
            // {$set: req.body}
            {
                name: name,
                email: email,
                password: hashPassword,
                role: role
            }
        );
        res.status(200).json({ updateduser, msg: "User Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Delete user
export const deleteUser = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
        return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    try {
        const deleteduser = await User.deleteOne({ _id: req.params.id });
        res.status(200).json({ deleteduser, msg: "User Deleted" });

    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}