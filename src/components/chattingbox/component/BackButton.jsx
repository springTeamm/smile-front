import React from "react";
import styles from "../css/BackButton.module.css"; // 스타일 파일도 추가합니다.

const BackButton = ({ onBack, roomNum }) => {
    return (
        <div className={styles.container}>
            <div>
                <button onClick={onBack} className={styles.backButton}>
                    {"뒤로가기"}
                </button>
            </div>
            <div className={styles.roomName}>채팅방 : {roomNum} </div>
        </div>
    );
};

export default BackButton;
