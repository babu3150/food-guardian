require('dotenv').config();
const express = require('express');
const session = require('express-session');

// ルートハンドラ用モジュールのインポート
const routes = require('./routes');

// Expressアプリの使用
const app = express();

// フォーム利用のための設定
app.use(express.urlencoded({ extended: false }));
// JSONを扱うための設定
app.use(express.json());

// セッション管理
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// public以下の静的ファイルを使用
app.use(express.static('public'));


// '/api'パスに対するルートハンドラの設定
app.use('/api', routes);

// テスト中はここで動かす
app.listen(3000, () => {
    console.log('サーバーはポート3000で起動中');
});