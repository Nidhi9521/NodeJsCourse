import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'
import { Order } from '../../models/orders'
import { Ticket } from '../../models/ticket'
import { OrderStatus } from '@ndgokani9521/common'
it('returns an errro if the ticket does not exist', async () => {
    const ticketId = new mongoose.Types.ObjectId();
    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({ ticketId })
        .expect(404)
})

it('returns an error if the ticket is already reseved', async () => {

    const ticket = Ticket.build({
        title: 'concert',
        price: 20
    })
    await ticket.save();
    const order = Order.build({
        ticket,
        userId: 'asdfghjk',
        status: OrderStatus.Created,
        expiresAt: new Date()
    })
    
    await order.save();
    var response=await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({ ticketId: ticket.id })
        .expect(400)
    
})

it('reseves a ticket', async () => {

    
    const ticket = Ticket.build({
        title: 'concert',
        price: 20
    })
    await ticket.save();

    var response=await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId: ticket.id })
    .expect(201)

})