import express from "express";
import {register, login, logout, me} from "../controllers/Auth.js";
// import { authenticateJWT } from "../middleware/AuthUser.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', me);
// router.get('/me', authenticateJWT, me);
router.delete('/logout', logout);

export default router;