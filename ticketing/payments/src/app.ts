import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import { NotFoundError,currentUser } from "@ndgokani9521/common";
import cookieSession from "cookie-session";

const app = express();
app.use(express.json());
app.set('trust proxy',true);
app.use(cookieSession({
    signed:false,
    secure: process.env.NODE_ENV !== 'test',
}))
app.use(currentUser);


app.all('*', async (req, res) => {
    throw new NotFoundError();
})


export { app };