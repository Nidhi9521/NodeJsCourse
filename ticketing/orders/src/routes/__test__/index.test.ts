import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'
import { Order } from '../../models/orders'
import { Ticket } from '../../models/ticket'
import { OrderStatus } from '@ndgokani9521/common'

const buildTicket = async () => {
    const ticket = Ticket.build({
        title: 'concert',
        price: 20,
        id: new mongoose.Types.ObjectId().toHexString()
    })
    await ticket.save();
    return ticket;
}

it('fetches order for an particular user', async () => {

    const ticketOne = await buildTicket();
    const ticketTwo = await buildTicket();
    const ticketThree = await buildTicket();

    const userOne = global.signin();
    const userTwo = global.signin();

    const { body: orderOne } = await request(app)
        .post('/api/orders')
        .set('Cookie', userOne)
        .send({ ticketId: ticketTwo.id })
        .expect(201)

    const { body: orderTwo } = await request(app)
        .post('/api/orders')
        .set('Cookie', userOne)
        .send({ ticketId: ticketOne.id })
        .expect(201)

    const { body: orderThree } = await request(app)
        .post('/api/orders')
        .set('Cookie', userTwo)
        .send({ ticketId: ticketThree.id })
        .expect(201)
    console.log('order');

    const response = await request(app)
        .get('/api/orders')
        .set('Cookie', userOne)
        .expect(200)

    expect(response.body.length).toEqual(2);
    expect(response.body[0].id).toEqual(orderOne.id)
    expect(response.body[1].id).toEqual(orderTwo.id)
    
})

it('', () => {

})