const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
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