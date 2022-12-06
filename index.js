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

// Creates a new mongoose.Schema with the front as a String and the back as a String. 
const confessionSchema = new mongoose.Schema({
    front: String,
    back: String
});

// Creates a new mongoose.model with "Confession" as the name, using the confessionSchema we just created.
const Confession = mongoose.model("Confession", confessionSchema);

// Modified POST route to add a new document to our database. Save the confession into our database. 
app.post("/new", async (req, res) => {
    const newPost = new Confession({front:req.body.front, back:req.body.back});
    await newPost.save()
    return res.send(newPost)
})

// Uses a method in Mongoose to find all the posts we have in our database. 
app.get("/posts", async (req, res) => {
    const foundAllPosts = await Confession.find();
    return res.send(foundAllPosts)
})

// Uses a method in Mongoose to find a post by its ID. 
app.get("/post/:id", async (req, res) => {
    let id = req.params.id
    const foundPost = await Confession.findById(id);
    return res.send(foundPost)
})

// Uses a method in Mongoose to delete a post by its ID. 
app.get("/delete/:id", async (req, res) => {
    let id = req.params.id
    const foundPost = await Confession.findByIdAndDelete(id);
    return res.send(foundPost)
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})