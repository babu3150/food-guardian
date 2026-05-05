const express = require('express');
const session = require('express-session');

// ルートハンドラ用モジュールのインポート
const routes = require('./routes');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static('public'));


// '/api'パスに対するルートハンドラの設定
app.use('/api', routes);

// テスト中はここで動かす
app.listen(3000, () => {
    console.log('サーバーはポート3000で起動中');
});