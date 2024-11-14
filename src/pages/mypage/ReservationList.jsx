import React, { useState } from 'react';
import styles from '../../styles/ReservationList.module.css';


const ReservationList = () => {
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
            <li><a href="/profile-edit">개인 정보 수정</a></li>
            <li><a href="/reservationList" className={styles.active}>예약 정보</a></li>
            <li><a href="/chatroom">채팅 룸</a></li>

          </ul>
        </nav>
      </aside>

      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>예약 정보</h1>
        <div className={styles.tabs}>
          <a href="#" className={styles.activeTab}>전체</a>
          <a href="#">진행 중</a>
          <a href="#">지난 내역</a>
          <a href="#">취소 내역</a>
        </div>

        <table className={styles.reservationTable}>
          <thead>
            <tr>
              <th>예약 번호</th>
              <th>예약 방 이름</th>
              <th>지불 가격</th>
              <th>진행 상황</th>
              <th>별점</th>
              <th>예약 날짜</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                <td>#{index + 1}</td>
                <td>Room {index + 1}</td>
                <td>₩100,000</td>
                <td>예약중</td>
                <td>4.5</td>
                <td>2024-11-14</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.pagination}>
          <button>&lt; 이전</button>
          <button>다음 &gt;</button>
        </div>
      </main>
    </div>
  );
};

export default ReservationList;
