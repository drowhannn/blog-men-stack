const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blogs");

const app = express();

//connect to mangoDB
const dbURI =
  "mongodb+srv://admin:PktB9grK2L3Szj5@cluster0.vhbzu.mongodb.net/netninja-tutorial-blog?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");

app.use(morgan("dev"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//blog routes
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: "desc" })
    .then((result) => {
      res.render("index", { title: "Home", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/blogs/:id");

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create New Blog" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
