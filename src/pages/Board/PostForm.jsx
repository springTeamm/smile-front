import React, { useState } from 'react';
import styles from '../../styles/PerformanceBoard.module.css';
import { Link } from 'react-router-dom';

const PostForm = () => {
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
          <li>
              <Link to="/board-all">전체 글</Link>
            </li>
            <li>
              <Link to="/board-performance">공연 홍보</Link>
            </li>
            <li>
              <Link to="/board-promotion">모집 공고</Link>
            </li>
            <li>
              <Link to="/board-recruit">장소 홍보</Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className={styles.postContent}>
        <h1 className={styles.title}>글 작성</h1>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title">글 제목</label>
            <input
              type="text"
              id="title"
              placeholder="글 제목을 입력해주세요."
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="images">이미지 첨부 (최대 5개)</label>
            <button type="button" className={styles.imageButton}>
              이미지 찾기
            </button>
          </div>
          <div className={styles.formGroup}>
            <label>카테고리</label>
            <select className={styles.select}>
              <option>공연 홍보</option>
              <option>모집 공고</option>
              <option>장소 홍보</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="content">내용 작성</label>
            <textarea id="content" className={styles.textarea}></textarea>
          </div>
          <button type="submit" className={styles.submitButton}>
            작성 완료
          </button>
        </form>
      </main>
    </div>
  );
};

export default PostForm;
