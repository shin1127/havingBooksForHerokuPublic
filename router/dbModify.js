const dbcn = require("./dbConnect");
const mysql = require("mysql");
const maxStar = 5;
const connection = dbcn.dbcn;

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

module.exports.modifyRecord = modifyRecord;
