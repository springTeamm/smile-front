import React from 'react';
import styles from '../../styles/BookingForm.module.css';

const BookingForm = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.Title}>연습실</h1>

      <h2 className={styles.roomTitle}>연습실 이름</h2>
      <div className={styles.dateSection}>
        <div>
          <label>체크인</label>
          <p>2024.10.23 (수) 15:00</p>
        </div>
        <div>
          <label>체크아웃</label>
          <p>2024.10.23 (수) 19:00</p>
        </div>
      </div>
      <div className={styles.details}>
        <p>기준 2명/최대 10명</p>
        <p>대여 <span className={styles.price}>50000원</span></p>
      </div>
      <form className={styles.form}>
        <h3>이용자 정보 *</h3>
        <div className={styles.inputGroup}>
          <label htmlFor="name">성명 *</label>
          <input type="text" id="name" placeholder="이용자의 성명을 입력해주세요" required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="phone">휴대폰 번호 *</label>
          <input type="tel" id="phone" placeholder="이용자의 휴대폰 번호를 입력해주세요" required />
        </div>
      </form>
      <div className={styles.payment}>
        <p>결제금액</p>
        <p className={styles.totalPrice}>50000원</p>
      </div>
      <button className={styles.submitButton}>결제 하기</button>
    </div>
  );
};

export default BookingForm;
