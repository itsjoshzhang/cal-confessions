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
const flashcardSchema = new mongoose.Schema({
    front: String,
    back: String
});

// Creates a new mongoose.model with "Confession" as the name, using the confessionSchema we just created.
const Flashcard = mongoose.model("Flashcard", flashcardSchema);

// Modified POST route to add a new document to our database. Save the confession into our database. 
app.post("/new", async (req, res) => {
    const newCard = new Flashcard({front:req.body.front, back:req.body.back});
    await newCard.save()
    return res.send(newCard)
})

// Uses a method in Mongoose to find all the posts we have in our database. 
app.get("/cards", async (req, res) => {
    const foundCards = await Flashcard.find();
    return res.send(foundCards)
})

// Uses a method in Mongoose to find a post by its ID. 
app.get("/card/:id", async (req, res) => {
    let id = req.params.id
    const foundCard = await Flashcard.findById(id);
    return res.send(foundCard)
})

// Uses a method in Mongoose to delete a post by its ID. 
app.get("/delete/:id", async (req, res) => {
    let id = req.params.id
    const foundCard = await Flashcard.findByIdAndDelete(id);
    return res.send(foundCard)
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})