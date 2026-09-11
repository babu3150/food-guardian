import React from "react";
// ログインフォーム用コンポーネント
import LoginForm from "../components/LoginForm";
import logoImage from "../images/app-logo.png";
import guardianSignInImage from "../images/guardian-signin.png";

function LoginPage({ onLogin, onMoveSignup }) {
  return (
    <div className="login-page">

      <div className="login-logo">
        <img src={logoImage} alt="食材の番人" />
      </div>

      <div className="login-main">
        <div className="login-form-area">

          <LoginForm onLogin={onLogin} />
          <div className="signup-area">
            <span>冷蔵庫の主でない者は</span>
            <button className="signup-link-button" onClick={onMoveSignup}>
              こちら
            </button>
          </div>
        </div>

        <div className="login-guardian">
          <img src={guardianSignInImage} alt="番人" />
        </div>
      </div>

    </div>
  );
}

export default LoginPage;