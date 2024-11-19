import React from 'react';
import styles from '../host/hosticon.module.css';

const Hostricon = ({ totalRooms, waitingApproval, rentingNow, rentalStopped, handleRegisterRoom }) => {
    return (
        <div className={styles.status_container}>
            <div className={styles.status_summary}>
                {totalRooms > 0 && (
                    <div className={styles.status_item}>
                        <span className={styles.icon}>ㅁ</span>&nbsp;&nbsp; 전체: {totalRooms}개
                    </div>
                )}
                {waitingApproval > 0 && (
                    <div className={styles.status_item}>
                        <span className={styles.icon}>⏳</span> &nbsp;&nbsp;승인 대기: {waitingApproval}개
                    </div>
                )}
                {rentingNow > 0 && (
                    <div className={styles.status_item}>
                        <span className={styles.icon}>🔄</span> &nbsp;&nbsp;대여 중: {rentingNow}개
                    </div>
                )}
                {rentalStopped > 0 && (
                    <div className={styles.status_item}>
                        <span className={styles.icon}>⛔</span> &nbsp;&nbsp;대여 중지: {rentalStopped}개
                    </div>
                )}
                <div className={styles.register_button}>
                    &nbsp; &nbsp;
                    <button onClick={handleRegisterRoom} className={styles.button}>정보 등록</button>
                </div>
            </div>
        </div>
    );
};

export default Hostricon;
