const express = require('express')
const {randomBytes} = require('crypto')
const axios = require('axios')
const cors =require('cors')
const app = express()
app.use(express.json())
app.use(cors())

const port = 4001
var posts={}
app.get('/', (req, res) => res.send('Hello World!'))

app.get('/post',(req,res)=>{
    console.log(posts);
    res.send(posts);
})
app.post('/post',async(req,res)=>{
    console.log('post');
     const id=randomBytes(4).toString('hex')
     const title = req.body.title;

     posts[id]={
        id,title
     }
    
  await axios.post('http://localhost:4003/events', {
    type: 'PostCreated',
    data: {
      id,
      title
    }
  });
console.log(posts[id]);
     res.status(201).send(posts[id]);

})
app.post("/events", (req, res) => {
    console.log("Received Event", req.body.type);
  
    res.send({});
  });
  
app.listen(port, () => console.log(`Example app listening on port ${port}!`))