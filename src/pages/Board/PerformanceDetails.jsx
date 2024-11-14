import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/PerformanceDetails.module.css';

const PerformanceDetails = () => {
  const [mainImage, setMainImage] = useState('https://via.placeholder.com/800x400');

  const smallImages = [
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
  ];

  const handleImageClick = (src) => {
    setMainImage(src);
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

      <main className={styles.content}>
      <div className="board-header">
    <span>박박박</span> | <span>예시 제목</span> | <span>2024.10.16</span> | <span>ㅁㅁ</span>
  </div>
          <div className={styles.imageSection}>
          <img src={mainImage} alt="Main" className={styles.mainImage} />
          <div className={styles.smallImages}>
            {smallImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => handleImageClick(src)}
                className={styles.thumbnail}
              />
            ))}
          </div>
        </div>

        <div className={styles.textSection}>
          <p>텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 </p>
        </div>
        <br />
        <div className={styles.when}>
        <h2>일정</h2>
        <p>2024.12.12(일)</p>
        <p>15:00</p>
        </div>
        <br></br>
        <div className={styles.member}>
        <h2>멤버</h2>
        <p>ㅇㅇㅇ,ㅇㅇㅇ,ㅇㅇㅇ,ㅇㅇㅇ</p>
        </div>
        <div className={styles.groupLink}>
          <Link to="/group-set-list">그룹 셋 리스트</Link>
        </div>

        <div className={styles.footer}>
        <div className={styles.authorSection}>
          <img
            src="https://via.placeholder.com/80"
            alt="작성자 프로필"
            className={styles.profileImage}
          />
          <span className={styles.username}>작성자 닉네임</span>
          <div className={styles.iconButtons}>
            <button className={styles.chatButton} title="채팅">💬</button>
          </div>
        </div>
        <button className={styles.likeButton}>👍 좋아요</button>
      </div>

      </main>
    </div>
  );
};

export default PerformanceDetails;
