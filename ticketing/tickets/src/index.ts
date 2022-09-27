import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {

    if (!process.env.jwt) {
        throw new Error('env not defiend')
    }
    if (!process.env.MONGO_URI) {
        throw new Error('env not defiend')
    }

    try {
        await mongoose.connect(process.env.MONGO_URI)
    } catch (err) {
        console.log(err);
    }

    app.listen(4000, () => {
        console.log('port serving at 4001');
    })
}

start();