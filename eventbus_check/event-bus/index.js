const axios  = require('axios')
const express = require('express')
const app = express()
app.use(express.json())
const port = 4003

app.post('/events',async(req,res)=>{
    console.log('CommentCreated');
    const { type, data } = req.body;
    console.log(`type ${type}`);

    const event = req.body;
    await axios.post('http://localhost:4000/events',event).catch((err) => {
        console.log(err.message);
      });
    await axios.post('http://localhost:4001/events',event).catch((err)=>{
        console.log(err.message);
        if(!err){
            console.log('hii');
        }
    });
     await axios.post('http://localhost:4002/events',event).catch((err)=>{
        console.log(err.message);
        if(!err){
            console.log('hii');
        }
    });
    await axios.post('http://localhost:4005/events',event).catch((err)=>{
        console.log(err.message);
        
        if(!err){
            console.log('hii');
        }else{
            console.log('4005 log');
        }
    });

    res.send({status:'ok'})
})
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))