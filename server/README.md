# baetoru server

映えとるのサーバーサイドです

# 使い方

1. F_2111 ルートディレクトリに`.env.secret`を以下の内容で記載してください

```.env.secret
AWS_ACCESS_KEY=配布されたアクセスキー
AWS_SECRET_KEY=配布されたシークレットキー
```

2. フロントの設定も行った後，ルートディレクトリで`make up`を行うと起動する
3. ルートディレクトリで`make flyway/migrate` を実行して DB のマイグレーションを行う
