var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "cdac",
});

var express = require("express"); //express
var mongoose = require("mongoose");
var db = require("./database/db.js");
//console.log(db);

db();

const Schema = mongoose.Schema;

const productsschema = new Schema({
  productname: String,
  price: Number,
  discount: Number,
});

const productModel = mongoose.model("products", productsschema);
var app = express(); //all functionality goes to app

app.use(express.json());

app.get("/products", async function (req, res) {
  try {
    var result = await productModel.find();
    res.send(result);
  } catch (err) {
    res.send(err.message);
  }
});
app.post("/products", async function (req, res) {
   console.log(req.body);
  try {
    var record = new productModel(req.body);
    var ans = await record.save();
    res.send("record inserted");
  } catch (err) {
    res.send(err.message);
  }
});
app.put("/products", function (req, res) {
  res.send("update data from database");
});
app.delete("/products", function (req, res) {
  res.send("delete data from database");
});
//my sql

app.get("/userinfo", function (req, res) {
  connection.query("select * from emp2", function (err, result) {
    if (err) {
      res.send(err.message);
    } else {
      res.send(result);
    }
  });
});

app.post("/userinfo", function (req, res) {
  console.log(req.body);
  connection.query("insert into emp2 set ?", req.body, function (err, result) {
    if (err) {
      res.send(err.message);
    } else {
      res.send("user added");
    }
  });
});

app.listen(9000); //port number
