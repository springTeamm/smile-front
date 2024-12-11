import React, { useState } from 'react';
import styles from '../../styles/Login.module.css';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = form.username;
    const password = form.password;
    await axios.post('http://localhost:5000/login/user',
        qs.stringify({username, password}),
        {
          header:{ 'Content-Type': 'application/x-www-form-urlencoded'},
          withCredentials: true
        }
    ).then(res => {
      if (res.status === 200) {
        console.log('로그인 성공:', res);
        localStorage.setItem('UserInfo', username);
      }
      console.log(res);
      // navigate("/");
    }).catch(err => {
      console.log(err);
    });
    console.log('Form Submitted:', form);
  };

  return (
      <div className={styles.pageContainer}>
        <div className={styles.loginBox}>
          <h2 className={styles.title}>로그인</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="아이디" className={styles.label}>ID</label>
              <input type="ID" id="ID" name="username" className={styles.input} placeholder="아이디를 입력해주세요." onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input type="password" id="password" name="password" className={styles.input} placeholder="비밀번호를 입력해주세요." onChange={handleChange} required />
            </div>
            <button type="submit" className={styles.submitButton}>로그인</button>
          </form>
          <div className={styles.footerLinks}>
            <a href="/forgot-password" className={styles.link}>비밀번호 찾기</a>
            <span className={styles.linkSeparator}>|</span>
            <a href="/signup" className={styles.link}>회원가입</a>
          </div>
        </div>
      </div>
  );
};

export default LoginPage;