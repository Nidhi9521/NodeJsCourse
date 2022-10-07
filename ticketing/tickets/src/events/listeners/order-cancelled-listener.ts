import { Listener, OrderCancelledEvent, Subjects } from "@ndgokani9521/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../model/ticket";
import { queueGroup } from './queue-group-name'
import { TicketUpdatedPublisher } from "../publishers/ticket-update-publisher";

export class OrderCancelledListener extends Listener<OrderCancelledEvent>{
    queueGroup = queueGroup;
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;

    async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
        const ticket = await Ticket.findById(data.ticket.id);

        if (!ticket) {
            throw new Error('Ticket not found')
        }

        ticket.set({ orderId: undefined });

        await ticket.save();
        new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            title: ticket.title,
            price: ticket.price,
            userId: ticket.userId,
            version: ticket.version,
            orderId:ticket.orderId
        });
        msg.ack();
    }
} 0