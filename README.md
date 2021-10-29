# 映えとる

![baetoru-logo](https://baetoru-public.s3.ap-northeast-1.amazonaws.com/baetoru-logo.png)

## 製品概要

写真の撮り方を共有するサービス

### 背景(製品開発のきっかけ、課題等）

SNS を利用する人が増え，いわゆる「映え写真」が多く投稿されるようになった．しかし，その撮り方を知る機会は少ないので撮り方を共有できるサービスが必要だと考えた．具体的には「機材・カメラの設定（F 値・シャッタースピード・ISO 感度など）・どの位置・どの角度から撮影したか」などが共有できると，同じような写真を撮れる人が増えるのではないかと考えた．

### 製品説明（具体的な製品の説明）

「映えとる」では写真の撮り方を共有することができる．投稿者は(Exif 情報付きの)画像をアップロードするだけで「カメラ情報・レンズ情報・フラッシュの有無・ISO 値・シャッタースピードの値など」の情報を共有することができる．
![upload-page](https://baetoru-public.s3.ap-northeast-1.amazonaws.com/upload-page.jpg)
アップロードされた情報と，それをもとに Google Map・ストリートビューに位置と向きが表示され，より具体的に情報を知ることができます．
![detail-page](https://baetoru-public.s3.ap-northeast-1.amazonaws.com/detail-page.jpg)

### 特長

#### 1. 写真をアップロードすると自動で Exif 情報が読み取られ, カメラ・レンズの設定が表示される（Exif 情報がない場合は写真のみ表示される.

![image-detail](https://baetoru-public.s3.ap-northeast-1.amazonaws.com/image-detail.jpg)

#### 2. Google Map・ストリートビューに写真を撮った場所・向きが表示される．（Exif 情報がない場合は表示されない).

![image-map](https://baetoru-public.s3.ap-northeast-1.amazonaws.com/image-map.jpg)

### 解決出来ること

映え写真を撮りたい人が撮り方を**詳しく**知ることができる．
写真の撮り方を共有したい・技術力を示したい人が写真を通して表すことができる．

### 今後の展望

- SNS 機能をつけてユーザーが交流できるようにする
- 既に有名な SNS サービスと連携して撮り方を表示できるようにする
- 画像編集の前後を比べたり，手法を共有できる機能をつける

事業として考えるなら

- カメラレンタル事業者と提携してその写真に必要な機材を丸ごとレンタルできる機能
- 旅行事業者と提携してその写真を撮ることを目的とした旅行プランが予約できる機能
- 被写体として写りたい人と写真を撮りたい人を繋げる機能

### 注力したこと（こだわり等）

- 簡単に写真の撮り方を共有できるようにした点
- exif 情報を読みやすい情報へ変換した点

## 開発技術

ありません

### 活用した技術

- exif
- AWS(EC2, S3)
- MySQL
- Docker

#### API・データ

- [Google Maps Platform](https://developers.google.com/maps?hl=ja)

#### フレームワーク・ライブラリ・モジュール

- Next.js
- chakra-ui
- EsLint
- gin-gonic/gin
- dsoprea/go-exif/v3
- [SteveLTN/https-portal](https://github.com/SteveLTN/https-portal)

#### デバイス

- カメラ(携帯を含む)

### 独自技術

ありません

#### ハッカソンで開発した独自機能・技術

- exif 情報の表示 - [b06343a](https://github.com/jphacks/F_2111/commit/b06343aa07419cf7574f5bdcf6baa49338de93fe)
-

##### 全体構成図

![architecture](https://baetoru-public.s3.ap-northeast-1.amazonaws.com/baetoru-architecture.png)

#### 製品に取り入れた研究内容（データ・ソフトウェアなど）（※アカデミック部門の場合のみ提出必須）

ありません
