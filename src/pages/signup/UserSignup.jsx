import React, { useState } from 'react';
import styles from '../../styles/UserSignup.module.css'; // 모듈 CSS import
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserSignup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userName: '',
    userId: '',
    emailLocal: '',
    emailDomain: '',
    userEmail: '',
    userPhone: '',
    userPassword: '',
    confirmUserPassword: '',
    termsAgree: false,
    privacyAgree: false,
    allAgree: false,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!form.termsAgree || !form.privacyAgree) {
      newErrors.allAgree = '이용약관 및 개인정보 수집 동의는 필수입니다.';
    }

    if (!form.userName) {
      newErrors.userName = '이름을 입력해주세요.';
    }

    if (!/^[a-z0-9_-]{5,20}$/.test(form.userId)) {
      newErrors.userId = '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.';
    }

    if (!form.emailLocal.trim() || !form.emailDomain.trim()) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요.';
    }

    if (!/^\d{3}-\d{3,4}-\d{4}$/.test(form.userPhone)) {
      newErrors.userPhone = '휴대전화번호 형식이 올바르지 않습니다. (예: 010-1234-5678)';
    }

    if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+|~=`{}[\]:;"'<>,.?/-]).{8,16}$/.test(form.userPassword)) {
      newErrors.userPassword = '8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.';
    }

    if (form.userPassword !== form.confirmUserPassword) {
      newErrors.confirmUserPassword = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAllAgree = () => {
    const agreeStatus = !form.allAgree;
    setForm({
      termsAgree: agreeStatus,
      privacyAgree: agreeStatus,
      allAgree: agreeStatus,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    form.userEmail = form.emailLocal + '@' + form.emailDomain;
    if (validate()) {
      await axios.post('http://localhost:5000/signup/user', form,
        {
          header:{ 'Content-Type': 'application/json'}
        }
      ).then(res => {
        navigate("/signup-complete")
      }).catch(err => {
        console.log(err);
      });
      console.log('Form Submitted:', form);
    }
  };

  return (
    <div className={styles.userSignupContainer}>
      <h1>회원가입</h1>
      <div className={styles.progressSteps}>
        <span className={styles.inactiveStep}>1. 회원 유형 선택</span>
        <span className={styles.activeStep}>2. 정보입력</span>
        <span className={styles.inactiveStep}>3. 가입완료</span>
      </div>

      <form onSubmit={handleSubmit} className={styles.signupForm}>
        <label>이름</label>
        <input
          type="text"
          name="userName"
          value={form.userName}
          onChange={handleChange}
        />
        {errors.userName && <span className={styles.error}>{errors.userName}</span>}

        <label>로그인ID</label>
        <input
          type="text"
          name="userId"
          value={form.userId}
          onChange={handleChange}
        />
        <p className={`${styles.rule} ${errors.userId ? styles.ruleError : ''}`}>
          {errors.userId || '아이디: 5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.'}
        </p>

        <label>이메일 주소</label>
        <div className={styles.emailInput}>
          <input
            type="text"
            name="emailLocal"
            value={form.emailLocal}
            onChange={handleChange}
          />
          <span>@</span>
          <input
            type="text"
            name="emailDomain"
            value={form.emailDomain}
            onChange={handleChange}
          />
        </div>
        {errors.email && <span className={styles.error}>{errors.email}</span>}

        <label>휴대폰 번호</label>
        <input
          type="tel"
          name="userPhone"
          value={form.userPhone}
          onChange={handleChange}
        />
        <p className={`${styles.rule} ${errors.userPhone ? styles.ruleError : ''}`}>
          {errors.userPhone || '휴대전화번호: 필수 정보입니다.'}
        </p>

        <label>비밀번호</label>
        <input
          type="password"
          name="userPassword"
          value={form.userPassword}
          onChange={handleChange}
        />
        <p className={`${styles.rule} ${errors.userPassword ? styles.ruleError : ''}`}>
          {errors.userPassword || '비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.'}
        </p>

        <label>비밀번호 확인</label>
        <input
          type="password"
          name="confirmUserPassword"
          value={form.confirmUserPassword}
          onChange={handleChange}
        />
        {errors.confirmUserPassword && <span className={styles.error}>{errors.confirmUserPassword}</span>}

        <div className={styles.agreementBox}>
          <div className={`${styles.agreementItem} ${styles.allAgree}`}>
            <input
              type="checkbox"
              name="allAgree"
              checked={form.allAgree}
              onChange={handleAllAgree}
            />
            <label>모두 동의</label>
          </div>
          {errors.allAgree && <span className={styles.termsError}>{errors.allAgree}</span>}

          <div className={styles.agreementItem}>
            <input
              type="checkbox"
              name="termsAgree"
              checked={form.termsAgree}
              onChange={handleChange}
            />
            <label>이용약관 동의 (필수)</label>
          </div>

          <div className={styles.agreementItem}>
            <input
              type="checkbox"
              name="privacyAgree"
              checked={form.privacyAgree}
              onChange={handleChange}
            />
            <label>개인정보 수집 및 이용 동의 (필수)</label>
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>
          다음
        </button>
      </form>
    </div>
  );
};

export default UserSignup;
