const express = require('express');
const port = 6500;

const server = express();

server.set("view engine", "ejs");
server.use(express.urlencoded({ extended: true }));

let books = [
  {
    id: "B101",
    title: "The Great Gatsby",
    author: "F.Scott Fitzgerald",
    language: "English",
    year: 1925,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBGYESwD9-RSRYKsbZQRC1z5oFzZExPt86vg&s"
  },
  {
    id: "B102",
    title: "War and Peace",
    author: "Leo Tolstoy",
    language: "Spanish",
    year: 1960,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQipQ7Lyx5hqwwzQ-poywyLaSU9BofY18KxZg&s"
  },
  {
    id: "B103",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    language: "English",
    year: 1949,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw-ze9tIU0Zbk6AMICu8cKvyv8uk1xb8WY6A&s"
  },
  {
    id: "B104",
    title: "Geetanjali",
    author: "Rabindra Nath Tagore",
    language: "Hindi",
    year: 1937,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuzSP49_yHzxa_SJ6JCk8T1RUVe7U2knipwg&s"
  },
  {
    id: "B105",
    title: "Harry Potter",
    author: "J.K. Rowling",
    language: "English",
    year: 1997,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSykX8BmFTrGPjS4eZo9mZj_S141tjJse-qlg&s"
  }
];

server.get("/", (req, res) => {
  res.render("index", { books });
});

server.get("/add-book", (req, res) => {
  res.render("addStudent");
});

server.post("/add-book", (req, res) => {
  let newBook = { ...req.body, year: Number(req.body.year) };
  if (!newBook.image) {
    newBook.image = "https://picsum.photos/400/200"; // default img
  }
  books.push(newBook);
  res.redirect("/");
});

server.get("/delete-book/:id", (req, res) => {
  let id = req.params.id;
  books = books.filter(bk => bk.id != id);
  res.redirect("/");
});

server.get("/edit-book/:id", (req, res) => {
  let id = req.params.id;
  let record = books.find(bk => bk.id == id);
  res.render("editStudent", { record });
});

server.post("/edit-book/:id", (req, res) => {
  let id = req.params.id;
  books = books.map(bk =>
    bk.id == id ? { ...bk, ...req.body, year: Number(req.body.year) } : bk
  );
  res.redirect("/");
});

server.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
