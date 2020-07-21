var mysql = require("mysql"); // mysql操作用のライブラリ
var express = require("express");
var app = express(); // express()メソッドをappという簡潔な名前に置き換え直してるだけ
const path = require("path");
const bodyParser = require("body-parser"); // HTMLの入力ボックスの中身をNode.jsで取得するため
const ejs = require("ejs");
const { resolve } = require("path");
// require("dotenv").config(); // パスワードとかベタがきしてると画面共有やGithubアップロードでヤバイ
const env = process.env; // herokuデプロイの都合上いまは使わない
const maxStar = 5; // 書籍評価の最大値
app.use(express.static("static"));
// app.use(express.static(__dirname));
// 画像やCSSなどの静的ファイルを利用するには、Expressにあらかじめ備わっているexpress.static関数を使います。

// https://reffect.co.jp/node-js/express-js-file-upload
const multer = require("multer"); // multerはミドルウェア　あとで勉強しとこう
const { timeStamp } = require("console");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "static/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.set("view engine", "ejs");

const modifyRecord = () => {
  return new Promise((resolve, reject) => {
    const sql = "select * from book";
    connection.query(sql, function (err, result, fields) {
      if (err) throw err;
      books = [];
      for (book of result) {
        book.colored = book.good;
        book.uncolored = maxStar - book.good;

        book.date = book.dateTimeJPN.getDate();
        book.month = book.dateTimeJPN.getMonth() + 1;

        // ページネーション作成用
        book.allcount = 60;
        book.maxPages = 6;
        book.currentPages = 1;

        books.push(book);
      }
      resolve(books);
    });
  });
};

// function modifyRecord() {
//   const sql = "select * from book";
//   connection.query(sql, function (err, result, fields) {
//     if (err) throw err;
//     books = [];
//     for (book of result) {
//       book.colored = book.good;
//       book.uncolored = maxStar - book.good;
//       books.push(book);
//     }
//   });
// }

var connection = mysql.createConnection({
  host: "hoge",
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
    console.log("Database connetion was successed");
  });
});

app.use(bodyParser.urlencoded({ extended: true })); // これなに？

app.get("/", async (req, res) => {
  // const sql = "select * from book";
  // connection.query(sql, function (err, result, fields) {
  //   if (err) throw err;
  //   books = [];
  //   for (book of result) {
  //     book.colored = book.good;
  //     book.uncolored = maxStar - book.good;
  //     books.push(book);

  const books = await modifyRecord();

  res.render("index", { book: books }); // resultで得た内容からbookの内容だけ取得したいということ？
});

app.get("/add", (req, res) => {
  // const sql = "select * from book";
  // connection.query(sql, function (err, result, fields) {
  //   if (err) throw err;
  //   res.render("index", { book: result }); // resultで得た内容からbookの内容だけ取得したいということ？
  // });
  res.render("add");
});

app.post("/addResult", upload.single("path"), (req, res) => {
  // upload.single("path")で画像アップロードの処理かなんかしてる
  // ここでのpathはadd.ejsで定義した<input type="file" name="path">のpathのこと
  const sql = "insert into book set ?";
  // const data = Object.assign(req.body, req.path);

  // console.log(req.file);
  // return;

  if ("file" in req) {
    // reqの中にfileが含まれているか？（オブジェクトの中に特定のプロパティが含まれているか？）
    req.body.path = req.file.filename;
    // reqの中身を知っておくことが大切, req.bodyオブジェクトにreq.file.filenameプロパティを挿入する
  } else {
    req.body.path = "noimage.png";
  }
  req.body.dateTimeJPN = new Date(); // 本の追加時に日時情報を付随させる

  connection.query(sql, req.body, async (err, result, fields) => {
    if (err) throw err;
    // console.log(req);
    // console.log(req.path); // upload.single("file")の中身
    // console.log(req.body);
    // console.log("dataを表示する");
    // console.log(result);
    // const sql2 = "select * from book";
    // connection.query(sql2, (err, result, field) => {
    //   if (err) throw err;
    //   books = [];
    //   for (book of result) {
    //     book.colored = book.good;
    //     book.uncolored = maxStar - book.good;
    //     books.push(book);
    //   } // このへんぜんぶmodifyRecordにまとめた　あとでasync/await構文勉強しとけ
    const books = await modifyRecord();
    res.render("index", { book: books }); // resultで得た内容からbookの内容だけ取得したいということ？
  });
});

app.get("/delete/:title", (req, res) => {
  const sql = "DELETE FROM book WHERE title = ?"; // SQLインジェクション！
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

app.get("/members", async (req, res) => {
  const books = await modifyRecord();

  res.render("members", { book: books });
});

// 検索ボックスの中身がないときの処理
app.get("/search", (req, res) => {
  const sql = "select * from book";

  connection.query(sql, function (err, result, fields) {
    console.log(sql);
    if (err) throw err;
    res.render("search", { book: result });
  });
});

// 検索ボックスに何か入力されてるときの処理
app.get("/search/:word", (req, res) => {
  // app.get(":word", (req, res) => {
  const searchWord = req.params.word;

  const sql =
    // "select * from book where title like " + "'%" + req.params.title + "%'";

    `select * from book where title like '%${searchWord}%'` +
    `or author like '%${searchWord}%'` +
    `or publisher like '%${searchWord}%'`;

  // "select * from book where title like " + // 汚い！
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

app.get("/detail/:id", (req, res) => {
  const sql = "select * from book where id = ?";
  connection.query(sql, [req.params.id], function (err, result, fields) {
    if (err) throw err;
    res.render("detail", { book: result });
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

app.get("/test", async (req, res) => {
  const books = await modifyRecord();

  res.render("indextest", { book: books }); // resultで得た内容からbookの内容だけ取得したいということ？
});

app.listen(process.env.PORT || 3000);

