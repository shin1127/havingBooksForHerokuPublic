var mysql = require("mysql"); // mysql操作用のライブラリ
var express = require("express");
var app = express(); // express()メソッドをappという簡潔な名前に置き換え直してるだけ
const path = require("path");
const bodyParser = require("body-parser"); // HTMLの入力ボックスの中身をNode.jsで取得するため
const ejs = require("ejs");
app.use(express.static("static"));
// app.use(express.static(__dirname));
// 画像やCSSなどの静的ファイルを利用するには、Expressにあらかじめ備わっているexpress.static関数を使います。

app.set("view engine", "ejs");

var connection = mysql.createConnection({
  host: "hoge.com",
  user: "hoge",
  password: "hoge",
  database: "hoge",
});

// MySQLに接続してクエリを実行し、結果を取得する

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected");

  const sql = "select * from book";
  connection.query(sql, function (err, result, field) {
    if (err) throw err;
    console.log("table shows");
  });
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const sql = "select * from book";
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.render("index", { book: result }); // resultで得た内容からbookの内容だけ取得したいということ？
  });
});

app.get("/add", (req, res) => {
  // const sql = "select * from book";
  // connection.query(sql, function (err, result, fields) {
  //   if (err) throw err;
  //   res.render("index", { book: result }); // resultで得た内容からbookの内容だけ取得したいということ？
  // });
  res.render("add");
});

app.post("/addResult", (req, res) => {
  const sql = "insert into book set ?";
  connection.query(sql, req.body, (err, result, fields) => {
    if (err) throw err;
    console.log(result);
  });
  const sql2 = "select * from book";
  connection.query(sql2, (err, result, field) => {
    if (err) throw err;
    console.log(result);
    res.render("index", { book: result });
  });
});

app.get("/delete/:title", (req, res) => {
  const sql = "DELETE FROM book WHERE title = ?";
  connection.query(sql, [req.params.title], function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.redirect("/");
  });
});

app.get("/edit/:title", (req, res) => {
  const sql = "select * from book where title = ?";
  connection.query(sql, [req.params.title], function (err, result, fields) {
    if (err) throw err;
    res.render("edit", { book: result });
  });
});

app.post("/update/:title", (req, res) => {
  const sql = "UPDATE book SET ? WHERE title = ?";

  console.log(sql);
  console.log(req.body);
  connection.query(sql, [req.body, req.params.title], function (
    err,
    result,
    fields
  ) {
    if (err) throw err;
    console.log(result);
    res.redirect("/");
  });
});

app.get("/search/:word", (req, res) => {
  const searchWord = req.params.word;

  const sql =
    // "select * from book where title like " + "'%" + req.params.title + "%'";

    `select * from book where title like '%${searchWord}%'` +
    `or author like '%${searchWord}%'` +
    `or publisher like '%${searchWord}%'`;

  // "select * from book where title like " +
  // "'%" +
  // req.params.word +
  // "%'" +
  // "or author like " +
  // "'%" +
  // req.params.word +
  // "%'" +
  // "or publisher like " +
  // "'%" +
  // req.params.word +
  // "%'";

  // "select * from book where title like ?";
  // const sql = "select * from book where title like '%?%'";
  // const sql = "select * from book";

  connection.query(sql, function (err, result, fields) {
    console.log(sql);
    if (err) throw err;
    res.render("search", { book: result });
  });
});

// デバッグ用のルーティング

app.get("/hoge/fuga/bar", (req, res) => {
  const sql = "select * from book";
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.render("index", { book: result }); // resultで得た内容からbookの内容だけ取得したいということ？
  });
});

app.listen(process.env.PORT || 3000);
