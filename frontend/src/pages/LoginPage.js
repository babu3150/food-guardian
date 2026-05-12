import React from "react";
// ログインフォーム用コンポーネント
import LoginForm from '../components/LoginForm';

function LoginPage({ onLogin }) {
    return (
        <div className="login-page">
            <div className="login-form-area">
                <h2>食材の番人</h2>
                <LoginForm onLogin={ onLogin } />
            </div>
            <div className="login-image-area">
                <img src="/food-guardian.png" alt="食材の番人" className="food-guardian-image" />
            </div>
        </div>
    );
}

export default LoginPage;z