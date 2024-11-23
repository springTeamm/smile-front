import React, { useState, useEffect } from "react";
import styles from "../../styles/ChatBox.module.css"; // 스타일 import
import ChattingRoom from "./ChattingRoom"

const ChatBox = () => {
  const [chatRooms, setChatRooms] = useState([]); // 채팅방 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const [selectedRoom, setSelectedRoom] = useState(null);

  // API 호출
  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await fetch("http://192.168.123.106:5000/api/chatrooms");
        if (!response.ok) {
          throw new Error("데이터를 가져오는데 실패했습니다.");
        }
        const data = await response.json();
        setChatRooms(data); // 데이터 상태 업데이트
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    };

    fetchChatRooms();
  }, []);

  const handleRoomClick = (roomNum) => {
    setSelectedRoom(roomNum);
  }


  if (loading) return <div className={styles.loading}>로딩 중...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.chatBoxContainer}>
      {!selectedRoom && <h2 className={styles.title}>채팅방 목록</h2>}

      {/* 채팅방 목록을 숨기고 선택된 방만 보이도록 조건부 렌더링 */}
      {!selectedRoom ? (
        <ul className={styles.chatRoomList}>
          {chatRooms.map((room) => (
            <li
              key={room.roomNum}
              onClick={() => handleRoomClick(room.roomNum)}
              className={styles.chatRoomItem}
            >
              <div>
                <strong>채팅방 번호:</strong> {room.roomNum}
              </div>
              <div>
                <strong>호스트 번호:</strong> {room.hostNum}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        // 선택된 채팅방의 대화 내역 컴포넌트
        <ChattingRoom roomNum={selectedRoom} />
      )}
    </div>
  );
};

export default ChatBox;
