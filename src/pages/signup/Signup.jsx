import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/Signup.module.css'; 
import normaluserIcon from './images/normal.png';
import hostuserIcon from './images/host.png';

const SignupPage = () => {
  const [selectedType, setSelectedType] = useState('');
  const navigate = useNavigate(); 

  const handleSelection = (type) => {
    setSelectedType(type);
    if (type === '일반 회원') {
      navigate('/UserSignup');
    } else if (type === '호스트 회원') {
      navigate('/host-signup');
    }
  };

  const handlePrevious = () => {
    navigate('/'); 
  };

  return (
    <div className={styles.signupContainer}>
      <h1>회원가입</h1>
      <div className={styles.progressSteps}>
        <span>1. 회원 유형 선택</span>
        <span>2. 정보입력</span>
        <span>3. 가입완료</span>
      </div>

      <div className={styles.signupBox}>
        <h1>회원 유형을 선택해주세요</h1>

        <div className={styles.signupOptions}>
          <div
            className={`${styles.optionCard} ${selectedType === '일반 회원' ? styles.selected : ''}`}
            onClick={() => handleSelection('일반 회원')}
          >
            <img src={normaluserIcon} alt="일반 회원 아이콘" />
            <h3>일반 회원</h3>
            <p>연습실을 이용할 분들은<br />일반 회원이에요</p>
          </div>

          <div
            className={`${styles.optionCard} ${selectedType === '호스트 회원' ? styles.selected : ''}`}
            onClick={() => handleSelection('호스트 회원')}
          >
            <img src={hostuserIcon} alt="호스트 회원 아이콘" />
            <h3>호스트 회원</h3>
            <p>연습실을 빌려주실 분들은<br />호스트 회원이에요</p>
          </div>
        </div>

        <button className={styles.beforeButton} onClick={handlePrevious}>
          이전
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
