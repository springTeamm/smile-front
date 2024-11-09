import React, { useState } from 'react';
import styles from '../../styles/UserSignup.module.css'; // 모듈 CSS import

const UserSignup = () => {
  const [form, setForm] = useState({
    name: '',
    username: '',
    emailLocal: '',
    emailDomain: '',
    phone: '',
    password: '',
    confirmPassword: '',
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

    if (!form.name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
    }

    if (!/^[a-z0-9_-]{5,20}$/.test(form.username)) {
      newErrors.username = '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.';
    }

    if (!form.emailLocal.trim() || !form.emailDomain.trim()) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요.';
    }

    if (!/^\d{3}-\d{3,4}-\d{4}$/.test(form.phone)) {
      newErrors.phone = '휴대전화번호 형식이 올바르지 않습니다. (예: 010-1234-5678)';
    }

    if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+|~=`{}[\]:;"'<>,.?/-]).{8,16}$/.test(form.password)) {
      newErrors.password = '8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.';
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
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
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <span className={styles.error}>{errors.name}</span>}

        <label>로그인ID</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
        <p className={`${styles.rule} ${errors.username ? styles.ruleError : ''}`}>
          {errors.username || '아이디: 5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.'}
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
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
        <p className={`${styles.rule} ${errors.phone ? styles.ruleError : ''}`}>
          {errors.phone || '휴대전화번호: 필수 정보입니다.'}
        </p>

        <label>비밀번호</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <p className={`${styles.rule} ${errors.password ? styles.ruleError : ''}`}>
          {errors.password || '비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.'}
        </p>

        <label>비밀번호 확인</label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}

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
