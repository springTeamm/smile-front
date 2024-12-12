import React, { useState } from 'react';
import styles from '../css/MessageButton.module.css';  // 스타일 import
import ChatBox from './ChatBox'

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
      {showMessages && <ChatBox />}
    </>
  );
};

export default MessageButton;
