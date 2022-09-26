import express,{Request,Response} from 'express';
import { body } from 'express-validator';
import { NotFoundError,validationRequest,requireAuth,NotAuthorizedError } from '@ndgokani9521/common';
import { Ticket } from '../model/ticket';

const router = express.Router();

router.put('/api/tickets/:id',requireAuth,[
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price').isFloat({gt:0}).withMessage('price must be provided')
],validationRequest,async(req:Request,res:Response)=>{
    const ticket = await Ticket.findById(req.params.id);
    if(!ticket){
        throw new NotFoundError();
    }
    if(ticket.userId!==req.currentUser!.id){
        throw new NotAuthorizedError();
    }
    ticket.set({
        title:req.body.title,
        price:req.body.price
    })
    await ticket.save();
    res.status(200).send(ticket);  
})
export { router as updateTicketRouter}