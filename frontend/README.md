# JPHACKS Frontend

## 起動

1. `frontend/.env`に以下の内容を記載する

```.env
NEXT_PUBLIC_SSR_HOST=http://app:8080
NEXT_PUBLIC_HOST=https://localhost
NEXT_PUBLIC_S3URL=baetoru-public.s3.ap-northeast-1.amazonaws.com
NEXT_PUBLIC_AWS_ACCESS_KEY=共有されたアクセスキー
NEXT_PUBLIC_AWS_SECRET_KEY=共有されたシークレットキー
NEXT_PUBLIC_GOOGLE_MAP_API_KEY=共有されたグーグルAPIKey
```

2. サーバーサイドの設定も終わったら`make up`で起動する

## 構成

frontend/pages には next routes に則ったページコンポーネントが入る。  
frontend/src/components/pages には、ページコンポーネントのパーツが入る。  
割と雑で大丈夫。  
その他のコンポーネント分割は、frontend/Header/index.tsx 的な感じで分割してもらえると〜🙇‍♂️

- frontend
  - /pages
    - index.tsx
      - エントリポイント
      - ホーム画面
    - path
      - index.tsx
  - /src
    - /components
      - Header
        - index.tsx
        - Header に表示するリンクは Links という配列で保持してるので逐次そこに追加して行ってください
      - /pages
        - /home
          - hoge.tsx
        - /about
          - hoge.tsx
    - types.ts
      - 型定義
      - 共通で使うやつ
      - そのコンポーネントでしか使ってないやつはそこでいい、2 箇所以上で使うならここに書く

## 最適化について

- 画像
  - 基本的に [next/image](https://nextjs.org/docs/api-reference/next/image) を使いましょう
  - takurinton は lazy load を手動実装して next/image に惨敗してます。素直に乗っかるのが良さそうです。
- レンダリング
  - 基本的に Next.js に任せましょう
  - memo 化とかしたくなったらやってもいいです。
  - カスタムフックを使う時は、handleChange などの関数は useContext でラップしましょう、それをした時はコンポーネントを React.memo で囲いましょう
  - 難しかったら余計なことはしなくていいです
  - メモ化については [この記事](https://blog.takurinton.dev/post/84) あたりを参考に
- キャッシュ
  - まずは考えない
  - 余裕があったら [Cache API](https://developer.mozilla.org/ja/docs/Web/API/Cache) を使うことを検討
