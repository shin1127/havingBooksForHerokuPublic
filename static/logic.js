function disp(title) {
  if (window.confirm("削除しますか？")) {
    location.href = "/delete/" + title;
  } else {
    window.alert("キャンセルされました");
  }
}

function clickSearch() {
  var inputwords = document.getElementById("searchWord").value;
  var link = "/search/" + inputwords;
  document.location = link;
  console.log(inputwords);
}
