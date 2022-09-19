const axios  = require('axios')
const express = require('express')
const app = express()
app.use(express.json())
const port = 4003
const events =[]
app.post('/events',async(req,res)=>{

    const { type, data } = req.body;
    console.log(`type ${type}`);
    events.push(req.body)
    const event = req.body;
    await axios.post('http://comments-srv:4000/events',event).catch((err) => {
        console.log(err.message);
      });
    await axios.post('http://post-clusterip-srv:4001/events',event).catch((err)=>{
        console.log(err.message);
        if(!err){
            console.log('hii');
        }
    });
    await axios.post('http://query-srv:4002/events',event).catch((err)=>{
        console.log(err.message);
        if(!err){
            console.log('hii');
        }
    });
    await axios.post('http://moderation-srv:4005/events',event).catch((err)=>{
        console.log(err.message);
        
        if(!err){
            console.log('hii');
        }else{
            console.log('4005 log');
        }
    });

    res.send({status:'ok'})
})
app.get('/events' , (req, res)=> {
    console.log('events', events);
    res.send(events);
})
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))