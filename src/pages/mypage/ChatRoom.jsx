import React, { useState } from 'react';
import styles from '../../styles/ChatRoom.module.css';

const ChatRoom = () => {
  const [messages, setMessages] = useState([
    { sender: '상대방', content: '서로 대화한 내용', isSelf: false },
    { sender: '나', content: '서로 대화한 내용', isSelf: true },
    { sender: '상대방', content: '서로 대화한 내용', isSelf: false },
    { sender: '나', content: '서로 대화한 내용', isSelf: true },
  ]);

  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { sender: '나', content: inputValue, isSelf: true }]);
      setInputValue('');
    }
  };

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
            <li><a href="/reservationList">예약 정보</a></li>
            <li><a href="/chatroom" className={styles.active}>채팅룸</a></li>
          </ul>
        </nav>
      </aside>

      <aside className={styles.chatList}>
        <ul>
          <li>
            <img src="https://via.placeholder.com/40" alt="Profile" className={styles.chatProfile} />
            <span>호스트닉네임1</span>
          </li>
          <li>
            <img src="https://via.placeholder.com/40" alt="Profile" className={styles.chatProfile} />
            <span>호스트닉네임2</span>
          </li>
          <li>
            <img src="https://via.placeholder.com/40" alt="Profile" className={styles.chatProfile} />
            <span>호스트닉네임3</span>
          </li>
        </ul>
      </aside>

      <main className={styles.chatSection}>
        <div className={styles.chatWindow}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={msg.isSelf ? styles.selfMessage : styles.otherMessage}
            >
              <span className={styles.sender}>{msg.sender}</span>
              <p className={styles.messageContent}>{msg.content}</p>
            </div>
          ))}
        </div>

        <div className={styles.inputSection}>
          <input
            type="text"
            placeholder="채팅을 입력해주세요."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={styles.chatInput}
          />
          <button onClick={handleSend} className={styles.sendButton}>입력</button>
        </div>
      </main>
    </div>
  );
};

export default ChatRoom;
