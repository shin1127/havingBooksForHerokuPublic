const dbcn = require("./dbConnect");
const mysql = require("mysql");
const modifyRecord = require("./dbModify");
const connection = dbcn.dbcn;
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "static/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

class operate {
  delete = (req, res) => {
    const sql = "DELETE FROM book WHERE title = ?";
    connection.query(sql, [req.params.title], function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.redirect("/");
    });
  };
  edit = (req, res) => {
    const sql = "select * from book where title = ?";
    connection.query(sql, [req.params.title], function (err, result, fields) {
      if (err) throw err;
      res.render("edit", { book: result });
    });
  };
  update = (req, res) => {
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
  };

  // 検索ボックスの中身がないとき
  search = (req, res) => {
    const sql = "select * from book";
    connection.query(sql, function (err, result, fields) {
      console.log(sql);
      if (err) throw err;
      res.render("search", { book: result });
    });
  };

  // 検索ボックスに何か入力されてるとき
  searchWord = (req, res) => {
    const searchWord = req.params.word;

    const sql =
      `select * from book where title like '%${searchWord}%'` +
      `or author like '%${searchWord}%'` +
      `or publisher like '%${searchWord}%'`;

    connection.query(sql, function (err, result, fields) {
      console.log(sql);
      if (err) throw err;
      res.render("search", { book: result });
    });
  };

  detail = (req, res) => {
    const sql = "select * from book where id = ?";
    connection.query(sql, [req.params.id], function (err, result, fields) {
      if (err) throw err;
      res.render("detail", { book: result });
    });
  };

  addResult = (req, res) => {
    const sql = "insert into book set ?";
    if ("file" in req) {
      req.body.path = req.file.filename;
    } else {
      req.body.path = "noimage.png";
    }
    req.body.dateTimeJPN = new Date(); // 本の追加時に日時情報を付随させる

    connection.query(sql, req.body, async (err, result, fields) => {
      if (err) throw err;
      const books = await modifyRecord.modifyRecord();
      res.render("index", { book: books }); // resultで得た内容からbookの内容だけ取得
    });
  };
}

module.exports.operate = operate;
