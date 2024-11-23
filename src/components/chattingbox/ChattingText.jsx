import React, { useState } from "react";
import styles from "../../styles/ChattingText.module.css";

const ChattingText = ({ roomNum, stompClient, onMessageSent }) => {
    const [message, setMessage] = useState(""); // 입력 중인 메시지 상태
    const userNum = 1; // 임시로 userNum 삽입 (나중에 바꿔야 함)

    const handleSendMessage = () => {
        if (message.trim() && stompClient && stompClient.connected) {
            const chatMessage = {
                userNum: userNum,
                logText: message,
                roomNum: roomNum
            };
            stompClient.send(
                `/app/chatrooms/${roomNum}/message`,
                {},
                JSON.stringify(chatMessage)
            );
            console.log("메세지: " + chatMessage.logText);
            console.log("유저번호: " + chatMessage.userNum);
            console.log("방번호: " + roomNum);
            setMessage("");
        }
    };

    return (
        <div className={styles.chattingTextContainer}>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={styles.messageInput}
                placeholder="메시지를 입력하세요"
            />
            <button onClick={handleSendMessage} className={styles.sendButton}>
                전송
            </button>
        </div>
    );
};

export default ChattingText;
