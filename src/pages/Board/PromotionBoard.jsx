import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/PerformanceBoard.module.css";
import { Link } from "react-router-dom";

const PromotionBoard = () => {
  const [posts, setPosts] = useState([]); // 게시글 데이터를 저장하는 상태

  // 장소 홍보 게시글 데이터를 가져오기 (categoryNum: 3)
  useEffect(() => {
    const fetchPromotionPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/community/category/3" // 카테고리 3: 장소 홍보
        );
        setPosts(response.data);
      } catch (error) {
        console.error("장소 홍보 게시글을 가져오는 중 에러 발생:", error);
      }
    };

    fetchPromotionPosts();
  }, []);

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
              <Link to="/community">전체 글</Link>
            </li>
            <li>
              <Link to="/board-performance">공연 홍보</Link>
            </li>
            <li>
              <Link to="/board-recruit">모집 공고</Link>
            </li>
            <li className={styles.active}>
              <Link to="/board-promotion">장소 홍보</Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1>장소 홍보</h1>
          <Link to="/create-post/promotion">
            <button className={styles.createButton}>글 작성</button>
          </Link>
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
            {posts.map((post) => (
              <tr key={post.cNum}>
                <td>{post.cNum}</td>
                <td>
                  <Link to={`/post/${post.cNum}`}>{post.title}</Link>
                </td>
                <td>{post.userNum}</td>
                <td>{new Date(post.date).toLocaleDateString()}</td>
                <td>0</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default PromotionBoard;
