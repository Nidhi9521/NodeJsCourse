import { BadRequestError, NotAuthorizedError, NotFoundError, OrderStatus, requireAuth, validationRequest } from "@ndgokani9521/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Order } from "../models/order";
import { Payment } from "../models/payment";
import { stripe } from "../stripe";
const router = express.Router();

router.post('/api/payment', requireAuth, [
    body('token').not().isEmpty(),
    body('orderId').not().isEmpty()
], validationRequest, async (req: Request, res: Response) => {
    const { token, orderId } = req.body
    const order = await Order.findById(orderId);

    if (!order) {
        throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }
    if (order.status === OrderStatus.Cancelled) {
        throw new BadRequestError('Cannot pay for an cancelled order');
    }
    console.log('near to payment');

    var paymentIntent = await stripe.paymentIntents.create({
        currency: 'INR',
        amount: order.price * 100
    })

    console.log(paymentIntent);


    const payment = Payment.build({
        orderId,
        StripeId: paymentIntent.id
    })
    console.log('stripe succ');

    res.status(201).send({ success: true })
})

export { router as createChargeRouter }