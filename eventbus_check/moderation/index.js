const { default: axios } = require('axios');
const express = require('express')
const app = express()
const port = 4005

app.get('/events', async (req, res) => {
    console.log(`4005 check`)
    const { type, data } = req.body;
    if (type === 'CommentCreated') {
        const status = 'approved';
        console.log("CommentCreated");
        await axios.post('http://event-srv:4003/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        })
        res.send({});
    }
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))