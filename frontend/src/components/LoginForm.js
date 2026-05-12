import React, { use, useState } from "react";

function LoginForm( { onLogin } ) {
    // 3つのステートを定義し、フォーム送信時に実行
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // フォーム送信時に実行
    const handleSubmit = async (e) => {
        // デフォルトのフォーム送信をキャンセル
        e.preventDefault();
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            onLogin();
        } else {
            setError('入力内容に誤りがあるゆえ、扉を開くことはできぬ');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="扉を開く者" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="扉を開く暗号" required />
            <button type="submit" className="login">冷蔵庫の扉を開く</button>
            {error && <p>{error}</p>}
        </form>
    );
}

export default LoginForm;