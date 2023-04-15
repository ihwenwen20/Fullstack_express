/**
 * All express app related logic here.
 * Session config and session store related logic has been
 * abstracted to session.ts
 *
 * Here, we setup our basic express app with a / and /logout routes.
 * The / route is where and how the user starts a new session and gets
 * a cookie with session id added to the browser. This cookie is also stored
 * in the session store (mongo db for this app) and is removed when the user
 * visits /logout route.
 */
// import express, { Application, Request, Response } from "express"
import express from "express";
import cors from "cors"
import session from "express-session"
import { sessionOptions } from "./session.js"
// import UserRoute from "./routes/UserRoute.js";
// import ProductRoute from "./routes/ProductRoute.js";
// import AuthRoute from "./routes/AuthRoute.js";

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
// app.use(cors({
//     // credentials untuk frontend,
//     credentials: true,
//     // domain boleh array [] jika banyak domain, tapi disini hanya untuk frontend saya saja
//     origin: []
//     // origin: 'http://localhost:3000'
// }));
app.use(session(sessionOptions))

// app.use(UserRoute);
// app.use(ProductRoute);
// app.use(AuthRoute);
app.get("/", async (req, res) => {
	res.send("Hello World")
})

// app.get("/logout", async (req, res) => {
// 	req.session.destroy((err) => {
// 		if (err) return console.error(err)
// 	})
// 	return res.clearCookie("connect.sid").send("Logout complete")
// })

export default app