import React, { useState, useEffect } from "react";
import { Client, Stomp } from "@stomp/stompjs";
import styles from "../css/ChattingRoom.module.css";
import ChattingText from "./ChattingText";
import BackButton from "./BackButton";
import SockJS from "sockjs-client";

const ChattingRoom = ({ roomNum, onBack }) => {
    const [chatText, setChatText] = useState([]); // 채팅 내역 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태
    const [stompClient, setStompClient] = useState(null); //stomp


    useEffect(() => {
        //채팅내역 api 호출(비동기 방식)
        const fetchchatText = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/chatrooms/${roomNum}`);
                if (!response.ok) {
                    throw new Error("채팅 내역을 가져오는데 실패했습니다.");
                }
                const data = await response.json();
                setChatText(data); // 채팅 상태 업데이트
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false); // 로딩 상태 해제
            }
        };

        fetchchatText();

        // STOMP 클라이언트 설정
        console.log("url 확인")
        const socket = new SockJS('http://localhost:5000/chatrooms');
        const client = Stomp.over(socket);

        client.connect({}, (frame) => {
            console.log("연결 성공: " + frame);

            client.subscribe(`/topic/chatrooms/${roomNum}`, (message) => {
                const parsedMessage = JSON.parse(message.body);
                console.log("메시지: ", parsedMessage);

                setChatText((prevChatText) => [...prevChatText, parsedMessage]);
            });

        }, (error) => {
            console.error("연결 에러", error);
        });

        setStompClient(client);

        return () => {
            if (client) {
                client.disconnect(() => {
                    console.log("STOMP 연결 해제");
                });
            }
        };
    }, [roomNum]);

    const handleTextSent = (newChatText) => {
        setChatText((prevChatText) => [...prevChatText, newChatText]);
    };

    return (
        <div className ={styles.chatContainer}>
            <div className={styles.chatRoomDetailContainer}>
                <BackButton roomNum={roomNum} onBack={onBack}/>
                <div>
                    <ul className={styles.chatTextList}>
                        {chatText.length > 0 ? (
                            chatText.map((chat, index) => (
                                <li key={index} className={styles.chatTextItem}>
                                    <strong>{chat.userNum}:</strong> {chat.logText}
                                </li>
                            ))
                        ) : (
                            <p className={styles.noChats}>채팅 내역이 없습니다.</p>
                        )}
                    </ul>
                </div>
            </div>
            {stompClient && ( // client가 초기화된 후에만 ChattingText 렌더링
                    <ChattingText roomNum={roomNum} stompClient={stompClient} onMessageSent={handleTextSent} />
                )}
        </div>
    );
};

export default ChattingRoom;
