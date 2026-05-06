const express = require('express');
const session = require('express-session');
const { createUser, authenticateUser, getFoods, addFood, deleteFood } = require('./db');

// ExpressのRouter作成
const router = express.Router();

// セッション管理
router.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));

// ログイン
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const authenticated = await authenticateUser(username, password);
    if (authenticated) {
        req.session.username = username;
        res.status(200).send('ログイン完了！');
    } else {
        res.status(401).send('ログインに失敗しました。ユーザー名またはパスワードに誤りがあります。');
    }
});

// ログアウト
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).send('ログアウトに失敗しました。再度ログアウトをおこなってください。');
        } else {
            res.status(200).send('ログアウト完了！');
        }
    });
});