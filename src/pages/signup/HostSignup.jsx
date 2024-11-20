import React, { useState } from 'react';
import styles from '../../styles/UserSignup.module.css';

const HostSignup = () => {
  const [form, setForm] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    emailLocal: '',
    emailDomain: '',
    phone: '',
    hostType: '국내 사업자',
    businessNumber: '',
    businessAddress: '',
    businessName: '',
    address: '',
    phoneNumber: '',
    ceoName: '',
    roomType: '',
    roomName: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
    }

    if (!form.username.trim()) {
      newErrors.username = '로그인 ID를 입력해주세요.';
    }

    if (!form.password.trim()) {
      newErrors.password = '비밀번호를 입력해주세요.';
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const checkBusinessNumber = () => {
    if (!form.businessNumber.trim()) {
      setErrors((prev) => ({
        ...prev,
        businessNumber: '사업자등록번호를 입력해주세요.',
      }));
      return;
    }

    console.log('사업자등록번호 확인:', form.businessNumber);

    setErrors((prev) => {
      const { businessNumber, ...rest } = prev;
      return rest;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form Submitted:', form);
    }
  };

  return (
    <div className={styles.hostSignupContainer}>
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

        <label>로그인 ID</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
        {errors.username && <span className={styles.error}>{errors.username}</span>}

        <label>비밀번호</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <span className={styles.error}>{errors.password}</span>}

        <label>비밀번호 확인</label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}

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

        <label>휴대폰 번호</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />

        <label>호스트 유형</label>
        <select
          name="hostType"
          value={form.hostType}
          onChange={handleChange}
        >
          <option value="국내 사업자">국내 사업자</option>
          <option value="해외 사업자">해외 사업자</option>
        </select>

        <label>사업자등록번호</label>
        <div className={styles.businessNumberContainer}>
          <input
            type="text"
            name="businessNumber"
            value={form.businessNumber}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={checkBusinessNumber}
            className={styles.checkButton}
          >
            확인
          </button>
        </div>
        {errors.businessNumber && <span className={styles.error}>{errors.businessNumber}</span>}

        <label>사업장 주소</label>
        <input
          type="text"
          name="businessAddress"
          value={form.businessAddress}
          onChange={handleChange}
        />

        <label>사업자명</label>
        <input
          type="text"
          name="businessName"
          value={form.businessName}
          onChange={handleChange}
        />

        <label>대표자명</label>
        <input
          type="text"
          name="ceoName"
          value={form.ceoName}
          onChange={handleChange}
        />

        <label>객실 유형</label>
        <select
          name="roomType"
          value={form.roomType}
          onChange={handleChange}
        >
          <option value="호텔">호텔</option>
          <option value="펜션">펜션</option>
          <option value="게스트하우스">게스트하우스</option>
          <option value="기타">기타</option>
        </select>

        <label>객실 이름</label>
        <input
          type="text"
          name="roomName"
          value={form.roomName}
          onChange={handleChange}
        />

        <button type="submit" className={styles.submitButton}>
          다음
        </button>
      </form>
    </div>
  );
};

export default HostSignup;
