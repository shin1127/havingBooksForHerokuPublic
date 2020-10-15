// requireの設定
const mysql = require("mysql");

// MySQLとのコネクションの作成
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "db1",
});

// 接続
connection.connect();

// userdataの取得
connection.query("select * from book;select * from book", function (
  err,
  result,
  fields
) {
  if (err) {
    console.log("err: " + err);
  }

  console.log(result);
});
