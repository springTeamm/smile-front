// Select.jsx
import React, { useState } from 'react';
import styles from "./Select.module.css";

const Select = ({ onSearch }) => {
    const [roomName, setRoomName] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [exhibitionStatus, setExhibitionStatus] = useState([]);
    const [roomType, setRoomType] = useState([]);

    const handleRoomNameChange = (e) => setRoomName(e.target.value);
    const handleRoomNumberChange = (e) => setRoomNumber(e.target.value);

    const handleExhibitionStatusChange = (e) => {
        const { value, checked } = e.target;
        const updatedStatus = checked
            ? [...exhibitionStatus, value]
            : exhibitionStatus.filter(status => status !== value);
        setExhibitionStatus(updatedStatus);
    };

    const handleRoomTypeChange = (e) => {
        const { value, checked } = e.target;
        const updatedType = checked
            ? [...roomType, value]
            : roomType.filter(type => type !== value);
        setRoomType(updatedType);
    };

    const handleSearch = () => {
        const searchData = {
            roomName,
            roomNumber,
            exhibitionStatus,
            roomType,
        };
        onSearch(searchData); // 부모 컴포넌트의 onSearch 호출
    };

    const handleReset = () => {
        setRoomName('');
        setRoomNumber('');
        setExhibitionStatus([]);
        setRoomType([]);
    };

    return (
        <div className={styles.search_component}>
            <div className={styles.input_group}>
                <h3>검색어</h3>
                <div className={styles.room_info}>
                    <label>방 이름</label>
                    <input
                        type="text"
                        value={roomName}
                        onChange={handleRoomNameChange}
                    />
                    <label>방 번호</label>
                    <input
                        type="text"
                        value={roomNumber}
                        onChange={handleRoomNumberChange}
                    />
                </div>
                <div className={styles.select_group}>
                    <div className={styles.checkbox_group}>
                        <label>방 상태</label>
                        <div className={styles.select_box}>
                            <label>
                                <input
                                    type="checkbox"
                                    value="대여 가능"
                                    checked={exhibitionStatus.includes("대여 가능")}
                                    onChange={handleExhibitionStatusChange}
                                />
                                대여 가능
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="대여 중"
                                    checked={exhibitionStatus.includes("대여 중")}
                                    onChange={handleExhibitionStatusChange}
                                />
                                대여 중
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="대여 중지"
                                    checked={exhibitionStatus.includes("대여 중지")}
                                    onChange={handleExhibitionStatusChange}
                                />
                                대여 중지
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="승인 대기"
                                    checked={exhibitionStatus.includes("승인 대기")}
                                    onChange={handleExhibitionStatusChange}
                                />
                                승인 대기
                            </label>
                        </div>
                        <label>방 유형</label>
                        <div className={styles.select_box}>
                            <label>
                                <input
                                    type="checkbox"
                                    value="00연습실"
                                    checked={roomType.includes("00연습실")}
                                    onChange={handleRoomTypeChange}
                                />
                                00연습실
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="00연습실"
                                    checked={roomType.includes("00연습실")}
                                    onChange={handleRoomTypeChange}
                                />
                                00연습실
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.button_group}>
                <button onClick={handleSearch} className={styles.search_button}>검색</button>
                <button onClick={handleReset} className={styles.reset_button}>초기화</button>
            </div>
        </div>
    );
};

export default Select;
