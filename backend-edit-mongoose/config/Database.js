import mongoose from "mongoose";

// const db = 'mongodb://localhost:27017/Fullstack_MERN';
mongoose.connect('mongodb://localhost:27017/Fullstack_MERN', {
    useNewUrlParser: true, useCreateIndex: true,
    useUnifiedTopology: true, useFindAndModify: true
});

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database Connected...'));


export default db;