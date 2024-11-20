import React, { useState } from 'react';
import styles from '../../styles/ProfileEdit.module.css';

const ProfileEdit = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.profile}>
          <img
            src="https://via.placeholder.com/80"
            alt="Profile"
            className={styles.profileImage}
          />
          <p className={styles.username}>이재혁</p>
        </div>
        <nav className={styles.nav}>
          <ul>
          <li><a href="/profile-edit" className={styles.active}>개인 정보 수정</a></li>
            <li><a href="/reservationList">예약 정보</a></li>
            <li><a href="/chatroom">채팅 룸</a></li>

          </ul>
        </nav>
      </aside>

      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>개인 정보 수정</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="id">아이디</label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
                className={styles.input}
              />
              <button type="button" className={styles.checkButton}>중복확인</button>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>내 정보 수정</button>
            <button type="button" className={styles.deleteButton}>회원 탈퇴</button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ProfileEdit;