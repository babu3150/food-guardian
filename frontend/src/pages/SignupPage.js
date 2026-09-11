import React from "react";
// ユーザー登録フォーム用コンポーネント
import SignupForm from "../components/SignupForm";
import logoImage from "../images/app-logo.png";
import guardianSignUpImage from "../images/guardian-signup.png";

function SignupPage({ onSignup, onMoveLogin }) {
  return (
    <div className="signup-page">
      <div className="signup-logo">
        <img src={logoImage} alt="食材の番人" />
      </div>

      <div className="signup-main">
        <div className="signup-form-area">
          <SignupForm onSignup={onSignup} />
          <div className="login-area">
            <span>冷蔵庫の扉を開く者は</span>
            <button className="login-link-button" onClick={onMoveLogin}>
              こちら
            </button>
          </div>
        </div>

        <div className="signup-guardian">
          <img src={guardianSignUpImage} alt="番人" />
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
