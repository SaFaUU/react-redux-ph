const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = 5000

require('dotenv').config()
var cors = require('cors')

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.1cmhy5v.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const blogCollection = client.db("reduxBlog").collection("reduxBlogPost");

        app.post('/create-post', async (req, res) => {
            const post = req.body;
            console.log(req.body)
            const response = await blogCollection.insertOne(post)
            res.send(response)
        })

        app.get('/get-blogs', async (req, res) => {
            const cursor = blogCollection.find({})
            const blogs = await cursor.toArray()
            res.send(blogs)
        })
        app.delete('/delete-blog/:id', async (req, res) => {
            const id = req.params.id;
            const response = await blogCollection.deleteOne({ _id: new ObjectId(id) })
            res.send(response)
        })
        app.put('/update-blog/:id', async (req, res) => {
            const id = req.params.id;
            const post = req.body;
            console.log(post);
            const newPost = {
                $set: {
                    "title": post.title,
                    "content": post.content,
                    "image": post.image,
                }
            }
            const response = await blogCollection.updateOne({ _id: new ObjectId(id) }, newPost, { upsert: true })
            res.send(response)
        })
    }
    catch {

    }
}


run().catch(console.dir)

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    console.log(uri);
})