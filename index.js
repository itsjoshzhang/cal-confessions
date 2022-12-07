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

const confessionSchema = new mongoose.Schema({
  front: String,
  back: String
});

const Confession = mongoose.model('Confession', confessionSchema)

app.post("/new", async (req, res) => {
    const newCard = new Confession({front:req.body.front, back:req.body.back});
    await newCard.save()
    return res.send(newCard)
})

app.get("/cards", async (req, res) => {
    const foundCards = await Confession.find()
    return res.send(foundCards)
})

app.get("/card/:id", async (req, res) => {
    const foundCard = await Confession.findById(req.params.id)
    return res.send(foundCard)
})

app.get("/delete/:id", async (req, res) => {
    const foundCard = await Confession.findByIdAndDelete(req.params.id)
    return res.send(foundCard)
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})