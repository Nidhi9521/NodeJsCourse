import express, { Request, response, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { validationRequest } from "../middleware/validate-request";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors/bad-request-error";
import { password as Password } from "../services/password";
const router = express.Router();

router.post('/api/users/signin', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().isLength({ min: 4, max: 20 }).withMessage('password ,must between more characters ')

], validationRequest,async (req: Request, res: Response) => {

    const {email,password}=req.body;

    const existingUser = await User.findOne({email});
    if(!existingUser){
        throw new BadRequestError('user is existing')
    }
    const passwordMatch= await Password.compare(existingUser.password,password);
    if(!passwordMatch){
        throw new BadRequestError('Invalid credentials')
    }
    if (!process.env.jwt) {
        throw new Error('env not defiend')
    }
    const userJWT = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
    }, process.env.jwt)

    //store it on session

    req.session = { jwt: userJWT };
    res.status(201).send({});
})

export { router as signinRouter };