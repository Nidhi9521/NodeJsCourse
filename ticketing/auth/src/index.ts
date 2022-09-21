import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "../src/middleware/error-handler"
import { NotFoundError } from "./errors/not-found-error";
import cookieSession from "cookie-session";

const app = express();
app.use(express.json());
app.set('trust proxy',true);
app.use(cookieSession({
    signed:false,
    secure:true,
}))

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)
app.use(errorHandler)

app.all('*', async (req, res) => {
    throw new NotFoundError();
})

// app.use('/',(req,res)=>{
//     res.send('HeLlO eVeRyOnE, You hit basic get api');
// })

const start = async () => {

    if (!process.env.jwt) {
        throw new Error('env not defiend')
    }

    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    } catch (err) {
        console.log(err);
    }
}

app.listen(3000, () => {
    console.log('port serving at 3000');

})
start();