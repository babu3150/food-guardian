const sqlite3 = require('sqlite3');
// 非同期処理をSQLiteのopen関数を使っておこなうように
const { open } = require('sqlite');

// データベース接続
async function openDB() {
    return await open({
        filename: './db.sqlite3',
        driver: sqlite3.Database
    });
}

// テーブルの初期化
async function initDB() {
    const db = await openDB();

    /* usersテーブルの作成
    username // ユーザー名
    password // パスワード
    */
   await db.exec(`
     CREATE TABLE IF NOT EXISTS users (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       username TEXT NOT NULL UNIQUE,
       password TEXT NOT NULL
     )
   `);

   // デフォルトユーザーの用意
   const user = await db.get(`SELECT * FROM users WHERE username = ?`, ['testuser']);
   if (!user) {
    await createUser('testuser', 'test');
   }

   /* foodsテーブルの作成
   id // 主キー
   username // ユーザー名
   name // 食材名
   expiration_date // 消費or賞味期限
   frozen // 冷凍中かどうか
   */
  await db.exec(`
    CREATE TABLE IF NOT EXISTS foods (
      id INTEGER PRIMARY KEY,
      username TEXT,
      name TEXT NOT NULL,
      expiration_date TEXT,
      frozen INTEGER DEFAULT 0
    )
  `)
}

// データベース接続の作成
const dbPromise = openDB();
initDB();

// ユーザーの作成
async function createUser(username, password) {
    const db = await dbPromise;
    await db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, password]);
}

// ユーザー認証の実施
async function authenticateUser(username, password) {
    const db = await dbPromise;
    const user = await db.get(`SELECT * FROM users WHERE username = ?`, [username]);

    if (user && password == user.password) {
        return true;
    } else {
        return false;
    }
}

// 食材の一覧取得（期限が近いものから表示するように）
async function getFoods(username) {
    const db = await dbPromise;
    return await db.all(`SELECT * FROM foods WHERE username = ? ORDER BY frozen ASC, expiration_date ASC`, [username]);
}

// 食材の追加
async function addFood(username, { name, expiration_date, quantity }) {
    const db = await dbPromise;
    await db.run(`INSERT INTO foods (username, name, expiration_date) VALUES (?, ?, ?)`, [username, name, expiration_date]);
}

// 食材の削除
async function deleteFood(id) {
    const db = await dbPromise;
    await db.run(`DELETE FROM foods WHERE id = ?`, [id]);
}

// 食材の冷凍
async function freezeFood(id) {
    const db = await dbPromise;
    await db.run(`UPDATE foods SET frozen = ? WHERE id = ?`, [1, id]);
}

// 上記関数をモジュールとしてエクスポート
module.exports = { createUser, authenticateUser, getFoods, addFood, deleteFood, freezeFood };