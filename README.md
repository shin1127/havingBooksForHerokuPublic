# habingBooksForHerokuPublic

パスワードなどの情報を隠した公開用のリポジトリ  
まさに今稼働しているWebアプリケーションと、当ソースコードは同期していない可能性があります。


ScrapBoxからの引用  
あとで編集する予定  
ここで提示した以外の情報はココ
https://scrapbox.io/dys/%E8%94%B5%E6%9B%B8%E7%AE%A1%E7%90%86%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0%E3%81%AE%E5%AD%A6%E3%81%B3%EF%BC%88%E8%B5%B0%E3%82%8A%E6%9B%B8%E3%81%8D%EF%BC%89

	herokuにうｐする（ていねい）  
https://qiita.com/sho7650/items/ebd87c5dc2c4c7abb8f0  

ローカルで動かすときはapp.js内の  
app.listenはポート3000番でいいけど、herokuで3000番使えるとは限らん  


 app.listen(process.env.PORT || 3000);  
HerokuでNode.jsアプリを実行する際のポート番号について  
https://chusotsu-program.com/heroku-node-port/  

	herokuデプロイ時のエラーログの見方  
1.herokuCLIをインストールする  
2.コンソール上でログイン→　heroku login  
3.ブラウザがたちあがるので認証  
4.heroku -a havingbooks logsと入力　※ここでのhavingbooksはheroku上のアプリ名（Githubでいうリポジトリ名的な）  

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
