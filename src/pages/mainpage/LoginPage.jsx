import React from 'react';
import styles from '../../styles/Login.module.css';

const LoginPage = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>로그인</h2>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="아이디" className={styles.label}>ID</label>
            <input type="ID" id="ID" className={styles.input} placeholder="아이디를 입력해주세요." required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input type="password" id="password" className={styles.input} placeholder="비밀번호를 입력해주세요." required />
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