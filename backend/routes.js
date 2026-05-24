const express = require('express');
const session = require('express-session');
const OpenAI = require('openai');
const { createUser, authenticateUser, getFoods, addFood, deleteFood, freezeFood } = require('./db');

// ExpressのRouter作成
const router = express.Router();

const client = new OpenAI({
    apiKey: process.env.OpenAI_API_KEY
});

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

// AI食材相談室用APIエンドポイント
router.post('/food-advisor', async (req, res) => {
    try {
        const food = req.body.food;
        const category = req.body.category;

        let prompt = '';

        if (category === 'freshness') {
            prompt = `鮮度の良い${food}の見分け方を50文字以内で教えて`;
        }

        if (category === 'nutrition') {
            prompt = `${food}の主な栄養、効率よく栄養を摂取できる食材の組み合わせ、栄養価が高くなる調理法、栄養価を高く食べられる時間帯を200文字で教えて`;
        }

        if (category === 'easy-recipe') {
            prompt = `${food}を使った簡単なレシピを教えて`;
        }

        if (category === 'difficult-recipe') {
            prompt = `${food}を使った手の込んだレシピを教えて`;
        }

        const response = await client.chat.completions.create({
            // コスト削減のため、あえて古いモデルを使用
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: '回答は簡潔にしてください'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ]
        });

        res.json({
            answer: response.choices[0].message.content
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'AIへの問い合わせに失敗しました'
        });
    }
});

module.exports = router;