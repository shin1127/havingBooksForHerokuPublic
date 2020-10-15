const mysql = require("mysql");
const dbcn = mysql.createConnection({
  host: "hoge",
  user: "hoge",
  password: "hoge",
  database: "hoge",
});

const dbcnIsSuccess = () =>
  dbcn.connect(function (err) {
    if (err) throw err;
    console.log("Connected");

    const sql = "select * from book";
    dbcn.query(sql, function (err, result, field) {
      if (err) throw err;
      console.log("Database connetion is successed");
    });
  });

module.exports.dbcn = dbcn;
module.exports.dbcnIsSuccess = dbcnIsSuccess;
