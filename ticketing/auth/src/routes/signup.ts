import express, { Request, response, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import jwt from "jsonwebtoken";
import { validationRequest } from "../middleware/validate-request";
const router = express.Router();

router.post('/api/users/signup', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('password ,must between more characters ')

],validationRequest, async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        console.log('email is in use');
        throw new BadRequestError('Email in use')
    }
    const user = User.build({ email, password });
    await user.save();

    //JWT
    if (!process.env.jwt) {
        throw new Error('env not defiend')
    }
    const userJWT = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.jwt)

    //store it on session

    req.session = { jwt: userJWT };
    res.status(201).send(user);

    // if(!email || typeof email!=='string'){
    //     res.status(400).send('Provide a valid email')
    // }
    //new User({email,password})
})

export { router as signupRouter };