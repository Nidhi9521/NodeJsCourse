const express = require('express')
const { randomBytes } = require('crypto')
const cors = require('cors')
const app = express()
const axios = require('axios')
app.use(express.json())
app.use(cors())
const port = 4000
var commentsByPostId = []
app.get('/', (req, res) => res.send('Hello World!'))

app.get('/posts/:id/comments', (req, res) => {
    console.log('log check');
    console.log(commentsByPostId[req.params.id]);
    res.send(commentsByPostId[req.params.id]);
})
app.post('/posts/:id/comments', async (req, res) => {

    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content, status: 'pending' });

    commentsByPostId[req.params.id] = comments;
    console.log(comments);

    await axios.post("http://localhost:4003/events", {
        type: "CommentCreated",
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending'
        },
    });
    res.status(201).send(comments);
});


app.post("/events", async (req, res) => {
    console.log("Event Received", req.body.type);

    const { type, data } = req.body;

    if (type === 'CommentModerated') {
        const { postId, id, status } = data;
        const comments = commentsByPostId[postId]
        const comment = comments.find(comment => {
            return comment.id === id
        })
        comment.status = status;

        await axios.post('http://localhost:4003/events', {
            type: 'CommentUpdated',
            data: {
                id,
                status,
                postId
            }
        })
    }

    res.send({});



})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))