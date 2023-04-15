import User from "../models/UserModel.js";
import jwt from "jsonwebtoken"
import argon2 from "argon2";

export const register = async (req, res) => {
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

// export const login = async (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;

//     if (!email) {
//         return res.status(400).json({ msg: 'Email Required.' });
//     } else if (!password) {
//         return res.status(400).json({ msg: 'Password Required.' });
//     } else {
//         try {
//             const user = await User.findOne({ email: email });
//             if (user) {
//                 const match = await argon2.verify(user.password, password);
//                 if (match) {
//                     req.session.userId = user.uuid;
//                     const { uuid, name, email, role } = user;
//                     return res.status(200).json({ uuid, name, email, role });
//                 } else {
//                     return res.status(400).json({ msg: 'Wrong Password' });
//                 }
//             } else {
//                 return res.status(404).json({ msg: 'User Not Found' });
//             }
//         } catch (error) {
//             console.error(error); // Menampilkan error di konsol untuk debugging
//             return res.status(500).json({ msg: 'Internal Server Error', error: error.message }); // Memberikan informasi rinci tentang kesalahan yang terjadi
//         }
//     }
// };


export const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email) {
        return res.status(400).json({ msg: 'Email Required.' });
    } else if (!password) {
        return res.status(400).json({ msg: 'Password Required.' });
    } else {
        try {
            const user = await User.findOne({ email: email });
            if (user) {
                const match = await argon2.verify(user.password, password);
                if (match) {
                    const payload = {
                        userId: user.uuid,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    };
                    // Menandatangani token JWT
                    const token = jwt.sign(payload, 'secret-key', { expiresIn: '1h' });
                    req.session.userId = user.uuid;
                    const { uuid, name, email, role } = user;
                    return res.status(200).json({ uuid, name, email, role, token });
                } else {
                    return res.status(400).json({ msg: 'Wrong Password' });
                }
            } else {
                return res.status(404).json({ msg: 'User Not Found' });
            }
        } catch (error) {
            console.error(error); // Menampilkan error di konsol untuk debugging
            return res.status(500).json({ msg: 'Internal Server Error', error: error.message }); // Memberikan informasi rinci tentang kesalahan yang terjadi
        }
    }
};

// export const me = async (req, res) => {
//     try {
//         if (!req.user) {
//             return res.status(401).json({ msg: 'Mohon login ke akun Anda!' });
//         }

//         const user = await User.findOne(
//             { uuid: req.user.userId },
//             { uuid: 1, name: 1, email: 1, role: 1 }
//         );

//         if (!user) {
//             return res.status(404).json({ msg: 'User tidak ditemukan' });
//         }

//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ msg: error.message });
//     }
// };

export const me = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
    }
    try {
        const user = await User.findOne({ uuid: req.session.userId }, { uuid: 1, name: 1, email: 1, role: 1 }); // Menggunakan method findOne pada model User untuk mengambil data user berdasarkan uuid
        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
        res.status(200).json({ msg: "Anda telah logout" });
    });
}