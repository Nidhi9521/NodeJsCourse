import { ExpirationCompleteEvent, Listener, OrderStatus, Subjects } from "@ndgokani9521/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/orders";
import { natsWrapper } from "../../nats-wrapper";
import { OrderCancelledPublisher } from "../publisher/order-cancelled-publisher";
import { queueGroup } from "./queue-group-name";

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent>{
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
    async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
        const order = await Order.findById(data.orderId);

        if (!order) {
            throw new Error('Order not found')
        }

        order.set({
            status: OrderStatus.Cancelled,
        })

        await order.save();
        msg.ack();
        new OrderCancelledPublisher(natsWrapper.client).publish({
            id: order.id,
            version: order.version,
            ticket: {
                id: order.ticket.id,
                price: order.ticket.price
            }
        }
        )
    }
    queueGroup = queueGroup;

}