import React from "react";
// ユーザー登録フォーム用コンポーネント
import SignupForm from '../components/SignupForm';

function SignupPage({ onSignup, onMoveLogin }) {
    return (
        <div className="signup-page">
            <div className="signup-form-area">
                <h2>冷蔵庫の主となる手続き</h2>
                <SignupForm onSignup={ onSignup } />
                <button className="login-link-button" onClick={onMoveLogin}>冷蔵庫の扉を開く者はこちら</button>
            </div>
            <div className="signup-image-area">
                <img src="/food-guardian-signup.png" alt="食材の番人" className="food-guardian-image" />
            </div>
        </div>
    );
}

export default SignupPage;