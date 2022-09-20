import express from "express";
import "express-async-errors";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "../src/middleware/error-handler"
import { NotFoundError } from "./errors/not-found-error";
const app=express();
app.use(express.json());

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)
app.use(errorHandler)

app.all('*',async(req,res)=>{
    throw new NotFoundError();
})

// app.use('/',(req,res)=>{
//     res.send('HeLlO eVeRyOnE, You hit basic get api');
// })

app.listen(3000,()=>{
    console.log('port serving at 3000');
    
})