import React from 'react';
import styles from '../host/hosticon.module.css';

const ManagerIcon = ({ totaluser, hostuser, saveroom, rentalStopped,text1,text2,text3 }) => {
    return (
        <div className={styles.status_container}>
            <div className={styles.status_summary}>
                {totaluser > 0 && (
                    <div className={styles.status_item}>
                        <span className={styles.icon}>ㅁ</span>&nbsp;&nbsp; {text1} : {totaluser}개
                    </div>
                )}
                {hostuser > 0 && (
                    <div className={styles.status_item}>
                        <span className={styles.icon}>⏳</span> &nbsp;&nbsp; {text2} : {hostuser}개
                    </div>
                )}
                {saveroom> 0 && (
                    <div className={styles.status_item}>
                        <span className={styles.icon}>🔄</span> &nbsp;&nbsp; {text3} : {saveroom}개
                    </div>
                )}
                {rentalStopped > 0 && (
                    <div className={styles.status_item}>
                        <span className={styles.icon}>⛔</span> &nbsp;&nbsp; 승인 대기: {rentalStopped}개
                    </div>
                )}

            </div>
        </div>
    );
};

export default ManagerIcon;
