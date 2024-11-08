import React from 'react';
import '../../styles/Signup.css';
import { useNavigate } from 'react-router-dom'; 
import thanksIcon from './images/thanks.png'; 

const SignupComplete = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="signup-container">
      <h1>회원가입</h1>
      <div className="progress-steps">
        <span>1. 회원 유형 선택</span>
        <span>2. 정보입력</span>
        <span className="active-step">3. 가입완료</span>
      </div>
      <div className="signup-box">
        <div className="signup-complete-container">
          <h1>가입이 완료되었습니다</h1>
          <br />
          <img 
            src={thanksIcon} 
            alt="Thank You Icon" 
            className="thanks-icon" 
          />
          <p>환영합니다! 회원가입이 성공적으로 완료되었습니다.</p>
          <p>로그인하여 서비스를 이용할 수 있습니다.</p>
          <br/>
          <button onClick={handleLogin} className="login-button">
            로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupComplete;
