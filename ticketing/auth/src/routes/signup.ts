import express,{Request,response,Response} from "express";
import { body, validationResult} from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";
const router = express.Router();

router.post('/api/users/signup',[
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({min: 4, max:20}).withMessage('password ,must between more characters ')

],async (req:Request,res:Response)=>{
    const error = validationResult(req);

    if(!error.isEmpty()){
        // return res.status(400).send(error.array())
        throw new RequestValidationError(error.array());
    }

    const {email,password}=req.body;
    console.log('creating user');
     throw new DatabaseConnectionError()
    res.send({});
     
    // if(!email || typeof email!=='string'){
    //     res.status(400).send('Provide a valid email')
    // }
    //new User({email,password})
})

export {router as signupRouter};