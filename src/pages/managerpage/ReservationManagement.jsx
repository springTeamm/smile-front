import React, { useState } from 'react';
import styles from "./UserManager.module.css";
import Pagecontroll from "../../components/manager/Pagecontroll";
import Managericon from "../../components/manager/managericon";
import Selectcomponent from "../../components/host/Selectcomponent";
import Dateselect from "../../components/host/dateselect";

const ReservationManagement = () => {
    // 검색 필드 설정
    const text = [
        {
            name: 'reservationDate',
            label: '예약 날짜',
            type: 'date', // 날짜 선택 필드
        },
        {
            name: 'username',
            label: '이름 검색',
            type: 'text', // 텍스트 입력 필드
        }
    ];

    // 초기 사용자 및 예약 데이터
    const initialReservations = [
        {
            id: 1,
            usernumber: 1011,
            username: "홍길동",
            userid: "상큼젤리",
            reservationDate: "2023-10-05",
            roomName: "회의실 A",
            hostName: "김호스트",
            usageTime: "2시간",
            price: "100,000원",
        },
        {
            id: 2,
            usernumber: 1022,
            username: "세종대왕",
            userid: "달콤캔디",
            reservationDate: "2023-10-10",
            roomName: "회의실 B",
            hostName: "박호스트",
            usageTime: "3시간",
            price: "200,000원",
        },
    ];

    const [reservate, setreservate] = useState(initialReservations);

    const totalroom = reservate.length;
    const saveroom = reservate.filter(field => field.reservationComplete === "Y").length;

    const handleSearch = (searchData) => {
        const filteredreserve = initialReservations.filter(user =>
            (searchData.username ? user.username.includes(searchData.username) : true) &&
            (searchData.reservationDate ? user.reservationDate === searchData.reservationDate : true)
        );
        setreservate(filteredreserve);
    };

    const handleReset = () => {
        setreservate(initialReservations);
    };

    const handleDeleteUser = (id) => {
        setreservate(reservate.filter(field => field.id !== id));
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}><Pagecontroll title="예약 확인"/></div>
            <div className={styles.icon}>
                <Managericon
                    totaluser={totalroom}//나중에 등록된 방수 데이터 베이스
                    saveroom={totalroom}
                    rentalStopped={"2"}
                    text1={"등록된 방 수"}
                    text3={"예약한 방 수"}
                />
            </div>
            <div className={styles.search_section}>
                <Selectcomponent
                    fields={text}
                    onSearch={handleSearch}
                    onReset={handleReset}
                />
            </div>
            <div className={styles.title}>
                <Dateselect text={"목록"} totalnum={totalroom}/>
            </div>
            <div className={styles.titledetail}><h3>예약 목록</h3></div>
            <div className={styles.table}>

                <div className={styles.table_container}>
                    <table>
                        <thead>
                        <tr>
                            <th>번호</th>
                            <th>유저 번호</th>
                            <th>유저 이름</th>
                            <th>유저 닉네임</th>
                            <th>예약 날짜</th>
                            <th>방 이름</th>
                            <th>호스트 이름</th>
                            <th>이용 시간</th>

                            <th>예약 요금</th>

                        </tr>
                        </thead>
                        <tbody>
                        {reservate.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.usernumber}</td>
                                <td>{user.username}</td>
                                <td>{user.userid}</td>
                                <td>{user.reservationDate}</td>
                                <td>{user.roomName}</td>
                                <td>{user.hostName}</td>
                                <td>{user.usageTime}</td>

                                <td>{user.price}</td>

                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ReservationManagement;
