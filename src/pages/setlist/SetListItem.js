import React from 'react';
import styles from '../../styles/SetListPage.module.css'; 

const SetListItem = ({ item }) => {
    return (
        <div className={styles.setlistItem}>
            <div className={styles.itemImage}>
                <img src={item.imageUrl} alt={item.title} />
                <button className={styles.favoriteButton}>♡</button>
            </div>
            <div className={styles.itemInfo}>
                <h3>{item.title}</h3>
                <p className={styles.location}>📍 {item.location}</p>
                <p className={styles.datetime}>🕒 {item.datetime}</p>
            </div>
            <div className={styles.itemButtons}>
                <button className={styles.serviceButton}>서비스 보기</button>
                <button className={styles.personalButton}>개인 연습 날짜</button>
                <button className={styles.teamButton}>팀별 연습 날짜</button>
            </div>
        </div>
    );
};

export default SetListItem;
