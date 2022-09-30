import express,{ Request,Response } from "express";
import { BadRequestError, NotFoundError, OrderStatus, requireAuth,validationRequest } from "@ndgokani9521/common";
import { body } from "express-validator";
import mongoose from "mongoose";
import {Ticket} from '../models/ticket';
import { Order } from "../models/orders";
const router = express.Router();
const EXPIRATION_WINDOW_SECONDS=15*60
router.post('/api/orders',
requireAuth,[
    body('ticketId')
    .not()
    .isEmpty()
    .custom((input:string)=> mongoose.Types.ObjectId.isValid(input))
    .withMessage('TicketId must be provided')
],validationRequest,
async (req:Request,res:Response) => {

    const {ticketId}=req.body;
    console.log(ticketId);
    
    const ticket= await Ticket.findById(ticketId);

    if(!ticket){
        console.log('ticket');
        
        throw new NotFoundError();
    }
    const isReserved= await ticket.isReserved();
    
    // const existingOrder= await Order.findOne({
    //     ticket:ticket,
    //     status:{
    //         $in:[
    //             OrderStatus.Created,
    //             OrderStatus.AwaitingPayment,
    //             OrderStatus.Complete
    //         ]
    //     }
    // })

    if (isReserved) {
        console.log('isReserved');
        
        throw new BadRequestError('Ticket is already reserved');
      }

    const expiration = new Date();

    expiration.setSeconds(expiration.getSeconds()+EXPIRATION_WINDOW_SECONDS)

    const order= Order.build({
        userId: req.currentUser?.id || '',
        status: OrderStatus.Created,
        expiresAt:expiration, 
        ticket
    })
    await order.save();
    res.status(201).send(order);
})

export { router as newOrderRouter}