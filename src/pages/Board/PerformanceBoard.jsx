import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../../styles/PerformanceBoard.module.css';

const PerformanceBoard = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/community/category/1');
        setPosts(response.data);
      } catch (error) {
        console.error('게시글 데이터를 가져오는데 실패했습니다:', error);
      }
    };

    fetchPosts();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPosts = posts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(posts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

        {/* 네비게이션 메뉴 */}
        <nav className={styles.nav}>
          <ul>
            <li className={styles.active}>
              <Link to="/board-performance">공연 홍보</Link>
            </li>
            <li>
              <Link to="/board-recruit">모집 공고</Link>
            </li>
            <li>
              <Link to="/board-promotion">장소 홍보</Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1>공연 홍보</h1>
          <Link to="/create-post/performance">
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
            </tr>
          </thead>
          <tbody>
            {currentPosts.length > 0 ? (
              currentPosts.map((post, index) => (
                <tr key={post.cnum}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>
                    <Link to={`/perform-posts/${post.cnum}`}>{post.title}</Link>
                  </td>
                  <td>{post.userNum}</td>
                  <td>{new Date(post.date).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className={styles.noData}>
                  게시글이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className={styles.pagination}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={styles.pageButton}
          >
            이전
          </button>
          {[...Array(totalPages).keys()].map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number + 1)}
              className={`${styles.pageButton} ${
                currentPage === number + 1 ? styles.activePage : ''
              }`}
            >
              {number + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={styles.pageButton}
          >
            다음
          </button>
        </div>
      </main>
    </div>
  );
};

export default PerformanceBoard;
