# havingBooksForHerokuPublic

パスワードなどの情報を隠した公開用のリポジトリ  
まさに今稼働しているWebアプリケーションと、当ソースコードは同期していない可能性があります。  

※dotenvをherokuに適用させる方法がわからないため、とりあえず本番用とリポジトリを分けています

# 開発中

## Background
自身が読んだ技術書のタイトルを簡単に[ココ](https://github.com/shin1127/TIL/blob/master/%25%E5%88%A9%E7%94%A8%E3%81%97%E3%81%9F%E6%8A%80%E8%A1%93%E6%9B%B8%E3%83%AA%E3%82%B9%E3%83%88.md)にまとめているのだが、  
正直使いづらいと思っているのと、より詳細を書き込めるようにしたいと感じていた。  

これをWebアプリケーションとしてリリースして、  
しかも自身だけではなく所属コミュニティメンバーなども技術書の追加や感想を書き込むことができたら面白いのではないか？と考えて開発をはじめた。  

## Qiita / Output

- [[Express]DBのデータを利用しつつイベントハンドラの実行、関数の定義・実行をする](https://qiita.com/cordy/items/7e38085e7ac9c74a4db5)
- [DBから取り出したINT型フィールドを、星の数として表示する機能を実装する](https://qiita.com/cordy/items/0e91c78aad5ac4cda5f2)


## Others / The things I learned

ScrapBoxからの引用  
あとで編集する予定  
ここで提示した以外の情報はココ
[蔵書管理システムの学び（走り書き）](https://scrapbox.io/dys/%E8%94%B5%E6%9B%B8%E7%AE%A1%E7%90%86%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0%E3%81%AE%E5%AD%A6%E3%81%B3%EF%BC%88%E8%B5%B0%E3%82%8A%E6%9B%B8%E3%81%8D%EF%BC%89)

	herokuにうｐする（ていねい）  
	
[heroku 初級編 - GitHub から deploy してみよう -](https://qiita.com/sho7650/items/ebd87c5dc2c4c7abb8f0)

ローカルで動かすときはapp.js内の  
app.listenはポート3000番でいいけど、herokuで3000番使えるとは限らん  


 app.listen(process.env.PORT || 3000);  
HerokuでNode.jsアプリを実行する際のポート番号について  
https://chusotsu-program.com/heroku-node-port/  

	herokuデプロイ時のエラーログの見方  
1.herokuCLIをインストールする  
2.コンソール上でログイン→　heroku login  
3.ブラウザがたちあがるので認証  
4.heroku havingbooks logs -a と入力　※ここでのhavingbooksはheroku上のアプリ名（Githubでいうリポジトリ名的な）  

	node.js上でMySQLをログインさせるときの注意点  
コンソール上で入力するのは以下だけど・・  
mysql -hhogehoge.com -以下略  

ここで-hはホスト名っていう意味　ホスト名がhhoge...ということじゃない  

	herokuにnode.jsをあげるときはpackage.jsonの中身が重要  
（herokuに必要なライブラリとか追加する必要がある、ローカルで動いた内容をそのままにしても動かない）  
  
詳しくは上にも書いた   
> 	herokuにうｐする（ていねい）  
> https://qiita.com/sho7650/items/ebd87c5dc2c4c7abb8f0  

のGithubリンク先https://github.com/heroku/node-js-getting-started 
のpackege.jsonのほぼコピペになる（必要な部分だけコピペ）  
