import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from "./UserManager.module.css";
import Pagecontroll from "../../components/manager/Pagecontroll";
import Managericon from "../../components/manager/managericon";
import Selectcomponent from "../../components/host/Selectcomponent";

import roomstyles from "../hostpagecss/Roomstyle.module.css";

const RoomManagement = () => {
    const text = [
        { name: 'userid', label: '유저 이름', type: 'text' },
        { name: 'roomName', label: '방 이름', type: 'text' },
    ];

    const initialUsers = [
        {
            id: 1,
            usernumber: 1011,
            username: "홍길동",
            userid: "상큼젤리",
            hostsave: "Y",
            registeredDate: "2023-01-15",
            roomName: "방음부스 녹음실",
            reservationStatus: "Y",
            reservationDetails: ["2024-11-18", "2024-11-20"],
            address: "서울시 강남구",
            price: "100,000원",
        },
        {
            id: 2,
            usernumber: 1022,
            username: "홍길동",
            userid: "달콤캔디",
            hostsave: "N",
            registeredDate: "2023-03-21",
            roomName: "회의실 B",
            reservationStatus: "N",
            reservationDetails: ["2024-11-19"],
            address: "서울시 서초구",
            price: "200,000원",
        },
    ];

    const [users, setUsers] = useState(initialUsers);
    const [selectedUserReservations, setSelectedUserReservations] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const totalroom=initialUsers.length;
    const handleSearch = (searchData) => {
        const filteredUsers = initialUsers.filter(user =>
            user.userid.includes(searchData.userid || '')
        );
        setUsers(filteredUsers);
    };

    const handleReset = () => {
        setUsers(initialUsers);
    };

    const handleDeleteUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
        alert("회원 삭제하는 백엔드 연동")
    };

    const openReservationModal = (reservations) => {
        setSelectedUserReservations(reservations.map(date => new Date(date))); // 예약 날짜를 Date 객체로 변환
        setIsModalOpen(true);
    };

    const closeReservationModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}><Pagecontroll title="방 관리" /></div>
            <div className={styles.icon}>
                <Managericon
                    totaluser={users.length}
                    saveroom={users.filter(user => user.reservationStatus === "Y").length}
                    rentalStopped={"2"}
                    text1={"등록된 방 수"}
                    text3={"예약한 방 수"}
                />
            </div>
            <div className={styles.search_section}>
                <Selectcomponent fields={text} onSearch={handleSearch} onReset={handleReset} />
            </div>
            <div className={styles.titledetail}><h3>방 목록(총 <span className={styles.totaluserHighlight}>{totalroom}</span>개)</h3></div>
            <div className={styles.table}>
                <div className={styles.table_container}>
                    <table>
                        <thead>
                        <tr>
                            <th>번호</th>
                            <th>유저 번호</th>
                            <th>유저 이름</th>
                            <th>유저 닉네임</th>
                            <th>호스트 등록</th>
                            <th>방 등록일</th>
                            <th>방 이름</th>
                            <th>예약 진행 여부</th>
                            <th>예약 현황 보기</th>
                            <th>주소</th>
                            <th>방 가격</th>
                            <th>회원 삭제</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.usernumber}</td>
                                <td>{user.username}</td>
                                <td>{user.userid}</td>
                                <td>{user.hostsave}</td>
                                <td>{user.registeredDate}</td>
                                <td>{user.roomName}</td>
                                <td>{user.reservationStatus}</td>
                                <td>
                                    {user.reservationStatus === "Y" ? (
                                        <button className={styles.button} onClick={() => openReservationModal(user.reservationDetails)}>확인</button>
                                    ) : (
                                        ""
                                    )}
                                </td>
                                <td>{user.address}</td>
                                <td>{user.price}</td>
                                <td><button className={styles.button} onClick={() => handleDeleteUser(user.id)}>삭제</button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 모달 창 */}
            {isModalOpen && (
                <div className={roomstyles.modal}>
                    <div className={roomstyles.modaltitle}><h2>예약 현황</h2></div>
                    <div className={roomstyles.modal_content}>
                        <div className={roomstyles.modaldate}>
                            <DatePicker
                                inline
                                highlightDates={selectedUserReservations} // 예약된 날짜 하이라이트
                            />
                        </div>
                        <div className={roomstyles.closemodal}>
                            <button onClick={closeReservationModal}>닫기</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomManagement;
