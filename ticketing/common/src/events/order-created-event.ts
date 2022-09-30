import { Subjects } from "./subjects";
import { OrderStatus } from "./types/order-status";
export interface OrderCreatedEvent {
    subject: Subjects.OrderCreated,
    data: {
        id:string;
        userId: string;
        status: OrderStatus;
        expiresAt: Date;
        ticket: {
            id:string;
            price:number;
        };
    }
}