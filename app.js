const mysql = require("mysql");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { resolve } = require("path");
const multer = require("multer");
const { timeStamp } = require("console");
const env = process.env;
const app = express();
const dbcn = require("./router/dbConnect");
const modifyRecord = require("./router/dbModify");
const bookOperate = require("./router/book");
const multerDiskStorage = require("./router/multer");
const operate = new bookOperate.operate();
const storage = multerDiskStorage.multerDiskStorage;
const upload = multer({ storage: storage });

app.set("view engine", "ejs");
app.use(express.static("static"));
app.use(bodyParser.urlencoded({ extended: true })); // これなに？

dbcn.dbcn;
dbcn.dbcnIsSuccess();

app.get("/", async (req, res) => {
  const books = await modifyRecord.modifyRecord();
  res.render("index", { book: books });
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/addResult", upload.single("path"), (req, res) => {
  operate.addResult(req, res);
});

app.get("/delete/:title", (req, res) => {
  operate.delete(req, res);
});

app.get("/edit/:title", (req, res) => {
  operate.edit(req, res);
});

app.post("/update/:title", (req, res) => {
  operate.update(req, res);
});

// 検索ボックスの中身がないときの処理
app.get("/search", (req, res) => {
  operate.search(req, res);
});

// 検索ボックスに何か入力されてるときの処理
app.get("/search/:word", (req, res) => {
  operate.searchWord(req, res);
});

app.get("/detail/:id", (req, res) => {
  operate.detail(req, res);
});

// =================デバッグ用のルーティング=================
//

// 未実装　会員登録のログイン先
app.get("/members", async (req, res) => {
  const books = await modifyRecord.modifyRecord();

  res.render("members", { book: books });
});

app.get("/hoge/fuga/bar", (req, res) => {
  const sql = "select * from book";
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.render("index", { book: result });
  });
});

app.get("/test", async (req, res) => {
  const books = await modifyRecord.modifyRecord();

  res.render("indextest", { book: books });
});

app.listen(process.env.PORT || 3000);
