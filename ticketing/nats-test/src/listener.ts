import nats, { Stan,Message } from 'node-nats-streaming'
import { randomBytes } from 'crypto';

console.clear();
const stan = nats.connect('ticketing',randomBytes(4).toString('hex'),{
    url:'http://localhost:4222'
})

stan.on('connect',()=>{
    console.log('Listener connected to NATS');
    
    stan.on('close',()=>{
        console.log('NATS connection closed!');
        process.exit();
    })

    const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName('accounting-services');
    const subscription=stan.subscribe('ticket:created','listenerQueueGroup',options)

    subscription.on('message',(msg:Message)=>{
        console.log('message recieved');
        const data=msg.getData();
        if(typeof data==='string'){
            console.log(`Received event ${msg.getSequence()}, with data: ${data}`);
            
        }
        msg.ack();
    })
})

process.on('SIGINT',()=> stan.close())
process.on('SIGTREM  ',()=> stan.close())

abstract class Listener{
    abstract subject :string;
    abstract queueGroup:string;
    private client:Stan;
    protected acWait=5*1000;
    
    constructor(client:Stan){
        this.client=client;
    }
    
}