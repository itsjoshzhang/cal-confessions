const express = require("express")
const app = express()

var cors = require('cors')
app.use(cors())

const mongoose = require('mongoose');

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connect().catch(err => console.log(err))

async function connect() {
  await mongoose.connect('mongodb+srv://calconfessions:calconfessions@calconfessions.r6kz7bf.mongodb.net/test')
}

const confessonSchema = new mongoose.Schema({
  front: String,
  back: String
});

const Confesson = mongoose.model('Confesson', confessonSchema)

app.post("/new", async (req, res) => {
    const newPost = new Confesson({front:req.body.front, back:req.body.back});
    await newPost.save()
    return res.send(newPost)
})

app.get("/posts", async (req, res) => {
    const foundPosts = await Confesson.find()
    return res.send(foundPosts)
})

app.get("/post/:id", async (req, res) => {
    const foundPost = await Confesson.findById(req.params.id)
    return res.send(foundPost)
})

app.get("/delete/:id", async (req, res) => {
    const foundPost = await Confesson.findByIdAndDelete(req.params.id)
    return res.send(foundPost)
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})