import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import MongoStore from "connect-mongo"
import UserRoute from "./routes/UserRoute.js";
// import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
dotenv.config();

const app = express();
const store = MongoStore.create({
    mongoUrl: process.env.URI,
});

mongoose.connect(process.env.URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database Connected...'));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    // credentials untuk frontend,
    credentials: true,
    // domain boleh array [] jika banyak domain, tapi disini hanya untuk frontend saya saja
    // origin: []
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(UserRoute);
// app.use(ProductRoute);
app.use(AuthRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.info(`Server up and running on port ${PORT}`);
});
