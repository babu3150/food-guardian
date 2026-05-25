import React, { use, useState } from "react";

function SignupForm( { onSignup } ) {
    // 3つのステートを定義し、フォーム送信時に実行
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // フォーム送信時に実行
    const handleSubmit = async (e) => {
        // デフォルトのフォーム送信をキャンセル
        e.preventDefault();
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            onSignup();
        } else {
            setError('そなたの名を登録できぬゆえ、異なる名を登録せよ');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} onInvalid={(e) => {e.target.setCustomValidity('そなたの名を入力せよ')}} onInput={(e) => {e.target.setCustomValidity('')}} placeholder="扉を開く者" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onInvalid={(e) => {e.target.setCustomValidity('そなたの暗号を入力せよ')}} onInput={(e) => {e.target.setCustomValidity('')}} placeholder="扉を開く暗号" required />
            <button type="submit" className="signup">冷蔵庫の主となる</button>
            {error && <p>{error}</p>}
        </form>
    );
}

export default SignupForm;