function disp() {
  // 「OK」時の処理開始 ＋ 確認ダイアログの表示
  if (window.confirm("削除しますか？")) {
    location.href = "/delete/<%= value.title %>"; // example_confirm.html へジャンプ
  }
  // 「OK」時の処理終了

  // 「キャンセル」時の処理開始
  else {
    window.alert("キャンセルされました"); // 警告ダイアログを表示
  }
  // 「キャンセル」時の処理終了
}

function disp() {
  if (window.confirm("削除しますか？")) {
    location.href = "/delete/" + '"' + value.title + '"';
  } else {
    window.alert("キャンセルされました");
  }
}
