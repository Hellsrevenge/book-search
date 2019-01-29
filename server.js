const db = require("./models");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const PORT = process.env.PORT || 3001;
const app = express();

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/unit18Populater";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("/api/books", (req, res) => {
    db.Book.find(req.query)
        .sort({ date: -1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

app.post("/api/books", (req, res) => {
    db.Book.create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

app.delete("/api/books/:id", (req, res) => {
    db.Book.findById({ _id: req.params.id })
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.get("/api/search/:q", (req, res) => {
    var url = "https://www.googleapis.com/books/v1/volumes?maxResults=12&q=" + req.params.q;
    axios.get(url).then(function(response) {
        var result = [];
        for (var i = 0; i < response.data.items.length; i++) {
            var book = {
                title: response.data.items[i].volumeInfo.title,
                description: response.data.items[i].volumeInfo.description,
                authors: "",
                image: "",
                link: response.data.items[i].volumeInfo.infoLink
            };

            if (typeof response.data.items[i].volumeInfo.authors != 'undefined') {
                book['authors'] = response.data.items[i].volumeInfo.authors.join(', ');
            }

            if (typeof response.data.items[i].volumeInfo.imageLinks != 'undefined') {
                book['image'] = response.data.items[i].volumeInfo.imageLinks.thumbnail;
            }

            result.push(book);
        }

        res.json(result);
    });
});



app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
