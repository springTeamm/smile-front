import React from 'react';
import styles from '../../styles/BookingPage.module.css';

const BookingPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.imageSection}>
          <div className={styles.imagePlaceholder}>업소의 대표 이미지</div>
          <div className={styles.storeName}>상호명: 예시업소</div>
        </div>
        <div className={styles.details}>
          <div className={styles.price}>10,000원 / 시간</div>
          <label>
            일시
            <input type="date" className={styles.input} />
          </label>
          <label>
            이용 시간 입력
            <input type="time" className={styles.input} />
          </label>
          <label>
            이용 인원
            <select className={styles.input}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10명 이상</option>
            </select>
          </label>
          <button className={styles.primaryButton}>신청하기</button>
          <button className={styles.secondaryButton}>문의하기</button>
        </div>
      </div>

      <div className={styles.textNav}>
        <span>장소소개</span> |
        <span>이용 규칙</span> |
        <span>리뷰</span>
      </div>

      <div className={styles.content}>
        <section>
          <h2>장소 소개</h2>
          <p>공석 내용</p>
        </section>
        <section>
          <h2>이용 규칙</h2>
          <p>관련 내용</p>
        </section>
        <section>
          <h2>리뷰</h2>
          <div className={styles.review}>
            <p>
              <strong>닉네임1</strong> <span className={styles.reviewDate}>2023-10-10</span>
            </p>
            <p>★★★★★</p>
            <p>리뷰 내용 1</p>
          </div>
          <div className={styles.review}>
            <p>
              <strong>닉네임2</strong> <span className={styles.reviewDate}>2023-11-09</span>
            </p>
            <p>★★★★☆</p>
            <p>리뷰 내용 2</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BookingPage;
