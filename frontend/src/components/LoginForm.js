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
            setError('ユーザー名またはパスワードに誤りがあります。');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="ユーザー名" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="パスワード" required />
            <button type="submit">ログイン</button>
            {error && <p>{error}</p>}
        </form>
    );
}

export default LoginForm;