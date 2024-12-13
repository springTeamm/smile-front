import React, { useState } from 'react';
import styles from '../../styles/UserSignup.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HostSignup = () => {
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
    hostType: '국내 사업자',
    businessRegistrationNumber: '',
    businessAddress: '',
    businessName: '',
    representativeName: '',
    roomType: '호텔',
    roomName: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.userName.trim()) {
      newErrors.userName = '이름을 입력해주세요.';
    }

    if (!form.userId.trim()) {
      newErrors.userId = '로그인 ID를 입력해주세요.';
    }

    if (!form.userPassword.trim()) {
      newErrors.userPassword = '비밀번호를 입력해주세요.';
    }

    if (form.userPassword !== form.confirmUserPassword) {
      newErrors.confirmUserPassword = '비밀번호가 일치하지 않습니다.';
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

  const checkbusinessRegistrationNumber = () => {
    if (!form.businessRegistrationNumber.trim()) {
      setErrors((prev) => ({
        ...prev,
        businessRegistrationNumber: '사업자등록번호를 입력해주세요.',
      }));
      return;
    }

    console.log('사업자등록번호 확인:', form.businessRegistrationNumber);

    setErrors((prev) => {
      const { businessRegistrationNumber, ...rest } = prev;
      return rest;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form Submitted:', form);
      form.userEmail = form.emailLocal + '@' + form.emailDomain;
      await axios.post('http://localhost:5000/signup/host', form,
          {
            header:{ 'Content-Type': 'application/json'}
          }
      ).then(res => {
        navigate("/signup-complete")
      }).catch(err => {
        console.log(err);
      });
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
              name="userName"
              value={form.userName}
              onChange={handleChange}
          />
          {errors.userName && <span className={styles.error}>{errors.userName}</span>}

          <label>로그인 ID</label>
          <input
              type="text"
              name="userId"
              value={form.userId}
              onChange={handleChange}
          />
          {errors.userId && <span className={styles.error}>{errors.userId}</span>}

          <label>비밀번호</label>
          <input
              type="password"
              name="userPassword"
              value={form.userPassword}
              onChange={handleChange}
          />
          {errors.userPassword && <span className={styles.error}>{errors.userPassword}</span>}

          <label>비밀번호 확인</label>
          <input
              type="password"
              name="confirmUserPassword"
              value={form.confirmUserPassword}
              onChange={handleChange}
          />
          {errors.confirmUserPassword && <span className={styles.error}>{errors.confirmUserPassword}</span>}

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
              name="userPhone"
              value={form.userPhone}
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
          <div className={styles.businessRegistrationNumberContainer}>
            <input
                type="text"
                name="businessRegistrationNumber"
                value={form.businessRegistrationNumber}
                onChange={handleChange}
            />
            <button
                type="button"
                onClick={checkbusinessRegistrationNumber}
                className={styles.checkButton}
            >
              확인
            </button>
          </div>
          {errors.businessRegistrationNumber && <span className={styles.error}>{errors.businessRegistrationNumber}</span>}

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
              name="representativeName"
              value={form.representativeName}
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
