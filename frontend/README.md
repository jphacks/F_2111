# JPHACKS Frontend

## 起動

```sh
npm install
npm run dev // run dev server
```

## 構成

frontend/pages には next routes に則ったページコンポーネントが入る。  
frontend/src/components/pages には、ページコンポーネントのパーツが入る。  
割と雑で大丈夫。  

- frontend
    - /pages
        - index.tsx
            - エントリポイント
            - ホーム画面
        - path
            - index.tsx
    - /src
        - /components
            - /pages
                - /home
                    - hoge.tsx
                - /about
                    - hoge.tsx
        - types.ts
            - 型定義
            - 共通で使うやつ
            - そのコンポーネントでしか使ってないやつはそこでいい、2箇所以上で使うならここに書く