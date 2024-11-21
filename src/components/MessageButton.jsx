import React, { useState } from 'react';
import styles from '../styles/MessageButton.module.css';  // 스타일 import

const MessageButton = () => {
  const [showMessages, setShowMessages] = useState(false);

  const handleMessageClick = () => {
    setShowMessages(prev => !prev);  // 쪽지함 토글
  };

  return (
    <>
      {/* 쪽지 버튼 */}
      <button 
        onClick={handleMessageClick} 
        className={styles.messageButton}
      >
        <span>💬</span>
      </button>

      {/* 쪽지함 */}
      <div className={`${styles.messagesContainer} ${showMessages ? styles.show : ''}`}>
        <p>여기서 쪽지 내용이 표기됩니다!</p>
      </div>
    </>
  );
};

export default MessageButton;
