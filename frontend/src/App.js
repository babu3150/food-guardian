import React, { useState } from 'react';
import './App.css';
// ログインページ（ログイン画面）用コンポーネント
import LoginPage from './pages/LoginPage';
// ホームページ（ホーム画面）用コンポーネント
import HomePage from './pages/HomePage';
// AI問い合わせページ（AI食材相談室）用コンポーネント
import FoodAdvisorPage from './pages/FoodAdvisorPage';

function App() {
  // ログイン状態の管理用ステート（isLoggedInの真偽値で管理）
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 現在ページの管理用ステート
  const [page, setPage] = useState('home');

  // ログイン
  const handleLogin = () => {
    setIsLoggedIn(true);
    setPage('home');
  };

  // ログアウト
  const handleLogout = async () => {
    const response = await fetch('/api/logout', {
      method: 'POST'
    });
    if (response.ok) {
      setIsLoggedIn(false);
    }
  };

  return (
    <div>
      {/* ログアウト中はログイン画面、ログイン中はホーム画面を表示 */}
      { !isLoggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <>
        {page === 'home' && (
          <HomePage onLogout={handleLogout} onMoveFoodAdvisor={() => setPage('food-advisor')}/>
        )}

        {page === 'food-advisor' && (
          <FoodAdvisorPage onLogout={handleLogout} onMoveHome={() => setPage('home')} />
        )}
        </>
      )}
    </div>
  );
}

export default App;