import express from "express";
import jwt from "jsonwebtoken";
import { currentUser } from "../middleware/current-user";
const router = express.Router();

router.get('/api/users/currentuser',currentUser, (req, res) => {
    console.log(req.currentUser);
    
    res.status(200).send({ currentUser: req.currentUser || null })
})

export { router as currentUserRouter };