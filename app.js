const express = require("express");
const mongoose = require("mongoose");
const postController = require("./post.controller");
require("ejs");

require("dotenv").config();
const path = require("path");

class App {
  constructor() {
    this.app = express();
    this.setDB();
    this.setEngine();
    this.setMiddleWare();
    this.setRouter();
    this.set404Error();
    this.setError();
  }
  setDB() {
    mongoose
      .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@restapi.mci3u.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ignoreUndefined: true,
      })
      .then(() => console.log("db connected"))
      .catch((err) => console.log(err));
  }

  setEngine() {
    this.app.set("view engine", "ejs");
    this.app.set("views", "./views");
  }

  setMiddleWare() {
    this.app.use("/static", express.static(path.join(__dirname, "static")));
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
  }
  setRouter() {
    this.app.use("/post", postController);
    this.app.get("/", (req, res) => {
      res.send("hello");
    });
  }
  set404Error() {
    this.app.use((req, res) => {
      res.status(404).send("404");
    });
  }
  setError() {
    this.app.use((err, req, res) => {
      console.log(err);
      res.status(500).send("500");
    });
  }
}

module.exports = App;
