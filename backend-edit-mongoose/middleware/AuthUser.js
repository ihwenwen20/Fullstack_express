import User from "../models/UserModel.js";
// import jwt from "jsonwebtoken"

// Middleware untuk verifikasi token JWT
// export const authenticateJWT = (req, res, next) => {
//     try {
//         const token = req.header('x-auth-token'); // Mendapatkan token dari header
//         if (!token) {
//             return res.status(401).json({ msg: 'Mohon login ke akun Anda!' });
//         }

//         // Memverifikasi token
//         const decoded = jwt.verify(token, config.get('jwtSecretKey'));
//         req.user = decoded.user; // Menyimpan data pengguna yang ditemukan dari token ke objek req

//         next();
//     } catch (err) {
//         return res.status(401).json({ msg: 'Token tidak valid' });
//     }
// };

export const verifyUser = async (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
    }
    try {
        const user = await User.findOne({
            uuid: req.session.userId
        });
        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
        req.userId = user.id;
        req.role = user.role;
        next();
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const adminOnly = async (req, res, next) => {
    const user = await User.findOne({
        uuid: req.session.userId
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    if (user.role !== "admin") return res.status(403).json({ msg: "Akses terlarang" });
    next();
}