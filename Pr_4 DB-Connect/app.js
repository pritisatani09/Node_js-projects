const express = require('express');
const port = 8001;

const app = express();
const dbConnection = require("./config/dbConnection")
const bookModel = require('./model/book.model');

app.set("view engine", 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    let books = await bookModel.find();
    return res.render("index", { books });
});

app.post("/add-book", async (req, res) => {
    await bookModel.create(req.body);
    console.log("Book added successfully");
    return res.redirect("/");
});

app.get("/add-book", (req, res) => {
    return res.render("add-book");
});

app.get("/delete-book/:id", async (req, res) => {
    let id = req.params.id;
    let book = await bookModel.findById(id);
    if (!book) {
        console.log("Book not found");
        return res.redirect("/");
    }
    await bookModel.findByIdAndDelete(id);
    console.log("Book deleted successfully");
    return res.redirect("/");
});

app.get("/edit-book/:id", async (req, res) => {
    let id = req.params.id;
    let book = await bookModel.findById(id);
    if (!book) {
        console.log("Book not found");
        return res.redirect("/");
    }
    return res.render("edit-book", { book });
});

app.post("/update-book/:id", async (req, res) => {
    let id = req.params.id;
    let book = await bookModel.findById(id);
    if (!book) {
        console.log("Book not found");
        return res.redirect("/");
    }
    await bookModel.findByIdAndUpdate(id, req.body, { new: true });
    console.log("Book updated successfully");
    return res.redirect("/");
});

app.listen(port, () => {
    dbConnection();
    console.log(`Server started at http://localhost:${port}`);
});
