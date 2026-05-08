import React from "react";
// ログインフォーム用コンポーネント
import LoginForm from '../components/LoginForm';

function LoginPage({ onLogin }) {
    return (
        <div>
            <h2>食材の番人</h2>
            <LoginForm onLogin={ onLogin } />
        </div>
    );
}

export default LoginPage;