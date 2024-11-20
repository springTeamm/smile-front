import React from 'react';
import styles from '../../styles/PerformanceBoard.module.css';
import { Link } from 'react-router-dom';
const PromotionBoard = () => {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.profile}>
          <img
            src="https://via.placeholder.com/100"
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
            <li className={styles.active}>
              <Link to="/board-recruit">장소 홍보</Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1>공연 홍보</h1>
          <button className={styles.createButton}>글 작성</button>
        </header>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>등록일</th>
              <th>좋아요</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>3</td>
              <td>(예시 제목)</td>
              <td>작성자 이름3</td>
              <td>24/10/23</td>
              <td>0</td>
            </tr>
            <tr>
              <td>2</td>
              <td>(예시 제목)</td>
              <td>작성자 이름2</td>
              <td>24/10/23</td>
              <td>0</td>
            </tr>
            <tr>
              <td>1</td>
              <td>(예시 제목)</td>
              <td>작성자 이름1</td>
              <td>24/10/23</td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default PromotionBoard;
