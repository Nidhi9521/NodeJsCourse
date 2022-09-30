import { requireAuth } from "@ndgokani9521/common";
import express, { Request, Response } from "express";
import { Order } from "../models/orders";
const router = express.Router();

router.get('/api/orders', requireAuth, async (req: Request, res: Response) => {
    console.log('get order');
    const orders = await Order.find({
        userId: req.currentUser?.id
    }).populate('ticket');
    console.log(orders);
    res.send(orders)
})

export { router as indexOrderRouter }