const express = require('express');
const session = require('express-session');
const { createUser, authenticateUser, getFoods, addFood, deleteFood, freezeFood } = require('./db');

// ExpressのRouter作成
const router = express.Router();

// セッション管理
router.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));

// ログイン用APIエンドポイント
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

// ログアウト用APIエンドポイント
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).send('ログアウトに失敗しました。再度ログアウトをおこなってください。');
        } else {
            res.status(200).send('ログアウト完了！');
        }
    });
});

// 食材の一覧取得用APIエンドポイント
router.get('/foods', async (req, res) => {
    if (!req.session.username) {
        return res.status(401).send('ユーザー情報を確認できませんでした。');
    }
    const foods = await getFoods(req.session.username);
    res.json(foods);
});

// 食材の追加用APIエンドポイント
router.post('/foods', async (req, res) => {
    if (!req.session.username) {
        return res.status(401).send('ユーザー情報を確認できませんでした。');
    }
    await addFood(req.session.username, req.body);
    res.status(201).send('食材をリストに追加しました！');
});

// 食材の削除用APIエンドポイント
router.delete('/foods/:id', async (req, res) => {
    if (!req.session.username) {
        return res.status(401).send('ユーザー情報を確認できませんでした。');
    }
    await deleteFood(req.params.id);
    res.status(200).send('食材をリストから削除しました！');
});

// 食材の冷凍用APIエンドポイント
router.put('/foods/:id/freeze', async (req, res) => {
    if (!req.session.username) {
        return res.status(401).send('ユーザー情報を確認できませんでした。');
    }
    await freezeFood(req.params.id);
    res.status(201).send('食材を冷凍しました！');
});

module.exports = router;