import express,{Request,Response} from 'express';
import { requireAuth, validationRequest } from '@ndgokani9521/common';
import {body} from 'express-validator';
import { Ticket } from '../model/ticket';
import { app } from '../app';
const router = express.Router();
console.log('log new.ts');

router.post('/api/tickets',
 requireAuth,
 [
    body('title').not().isEmpty().withMessage('Title is requires'),
    body('price').isFloat({gt:0}).withMessage('Price is not valid')
],validationRequest,
async(req:Request,res:Response)=>{
    console.log('post tickets');
    
     const { title, price} = req.body;
     console.log('title',title);
     console.log('price',price);
     
     const ticket = Ticket.build({
        title,
        price,
        userId: req.currentUser!.id
     })
     await ticket.save()
     console.log('done');
     
     res.status(201).send(ticket);
})

export { router as TicketRouter};