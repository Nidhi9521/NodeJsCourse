import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
const start = async () => {

    if (!process.env.jwt) {
        throw new Error('env not defiend')
    }
    if (!process.env.MONGO_URI) {
        throw new Error('env not defiend')
    }

    try {
        await natsWrapper.connect('ticketing','qwe','http://nats-srv:4222')

        natsWrapper.client.on('close', () => {
            console.log('NATS connection closed!');
            process.exit();
        })

        process.on('SIGINT', () => natsWrapper.client!.close())
        process.on('SIGTREM  ', () => natsWrapper.client!.close())
        await mongoose.connect(process.env.MONGO_URI)
    } catch (err) {
        console.log(err);
    }

    app.listen(4000, () => {
        console.log('port serving at 4001');
    })
}

start();