const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const db = require("./models");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/googlebooks";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.post("/api/books", (req, res) => {
    db.Book.updateOne(
        { link: req.body.link },
        {
            $set: {
                title: req.body.title,
                authors: req.body.authors,
                description: req.body.description,
                image: req.body.image,
                link: req.body.link
            }
        },
        { upsert: true }
    )
        .then(dbBook => {
            res.json(dbBook);
            console.log("saved book")
        }).catch(error => res.json(error));
});

app.get("/api/books", (req, res) => {
    db.Book.find({})
        .then(dbBook => res.json(dbBook))
        .catch(error => res.json(error));
});

app.delete("/api/books/:id", (req, res) => {
    db.Book.deleteOne({ _id: req.params.id })
        .then(dbBook => res.json(dbBook))
        .catch(error => res.json(error));
});

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
});
