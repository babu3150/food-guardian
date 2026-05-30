import React from "react";
// ログインフォーム用コンポーネント
import LoginForm from "../components/LoginForm";

function LoginPage({ onLogin, onMoveSignup }) {
  return (
    <div className="login-page">
      <div className="login-form-area">
        <h2>食材の番人</h2>
        <LoginForm onLogin={onLogin} />
        <button className="signup-link-button" onClick={onMoveSignup}>
          冷蔵庫の主でない者はこちら
        </button>
      </div>
      <div className="login-image-area">
        <img
          src="/food-guardian.png"
          alt="食材の番人"
          className="food-guardian-image"
        />
      </div>
    </div>
  );
}

export default LoginPage;
