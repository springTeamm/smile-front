import React from "react";
import styles from "../hostpagecss/Dashboard.module.css";

const Dashboard = () => {
    return (
        <div className={styles.dashboardContainer}>
            {/* 예약 현황 */}
            <div className={styles.section}>
                <h3 className={styles.title}>예약 현황</h3>
                <ul className={styles.list}>
                    <li>결제 대기 <span>1건</span></li>
                    <li>신규 예약 <span>1건</span></li>
                    <li>취소 요청 <span>1건</span></li>
                </ul>
            </div>

            {/* 공지사항 */}
            <div className={styles.section}>
                <h3 className={styles.title}>공지사항 ></h3>
                <ul className={styles.noticeList}>
                    <li>공지사항입니다... <span>10.10</span></li>
                    <li>공지사항입니다... <span>10.10</span></li>
                    <li>공지사항입니다... <span>10.10</span></li>
                </ul>
            </div>

            <div className={styles.claimSection}>
                <h3 className={styles.claimTitle}>클레임/정산</h3>
                <div className={styles.claimContent}>
                    <div className={styles.claimItem}>
                        <span>취소 요청:</span> <strong>1건</strong>
                    </div>
                    <div className={styles.claimItem}>
                        <span>취소 요청 완료:</span> <strong>1건</strong>
                    </div>
                    <div className={styles.claimItem}>
                        <span>정산 예정 금액:</span> <strong>100,000원</strong>
                    </div>
                </div>
            </div>

            {/* 공간 */}
            <div className={styles.section}>
                <h3 className={styles.title}>공간</h3>
                <ul className={styles.list}>
                    <li>대여 중 공간 <span>2건</span></li>
                    <li>대여 완료 공간 <span>12건</span></li>
                    <li>수정 요청 공간 <span>1건</span></li>
                </ul>
            </div>

            {/* 리뷰 */}
            <div className={styles.section}>
                <h3 className={styles.title}>리뷰</h3>
                <ul className={styles.list}>
                    <li>새로운 리뷰 <span>2건</span></li>
                    <li>별점 낮은 리뷰 <span>1건</span></li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
