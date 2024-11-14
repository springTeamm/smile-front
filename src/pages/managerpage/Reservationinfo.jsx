import React, { useEffect, useState } from 'react';

import styles from "../managerpagecss/Cancellmanagement.module.css";
import Managertitle from "../../components/manager/managertitle";
import Dateselect from "../../components/manager/dateselect";
import Searchservation from "../../components/manager/Selectreservation";
import roomstyles from "../managerpagecss/Roomstyle.module.css";


const Reservationinfo = () => {
    const [rooms, setRooms] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchRooms = async () => {
            const rooms = [
                {
                    select: false,
                    roomNumber: "101호",
                    paymentNumber: "20241234567",
                    renterName: "김현수",
                    reservationTime: "11:00-15:00",
                    accumulatedReservations: 0,
                    numberOfRenters: 0,
                    roomName: "연습실A",
                    paymentDate: "2024-10-15",
                    rentalPrice: "100,000원",
                    discountPrice: "90,000원",
                    claimStatus: "없음"
                },
                {
                    select: false,
                    roomNumber: "102호",
                    paymentNumber: "20241234568",
                    renterName: "박지민",
                    reservationTime: "14:00-16:00",
                    accumulatedReservations: 2,
                    numberOfRenters: 1,
                    roomName: "연습실B",
                    paymentDate: "2024-10-20",
                    rentalPrice: "80,000원",
                    discountPrice: "75,000원",
                    claimStatus: "있음"
                },
            ];
            setRooms(rooms);
        };

        fetchRooms();
    }, []);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const totalRooms = rooms.length;

    const fields = [
        { name: 'customerName', label: '고객명' },
        { name: 'phoneNumber', label: '전화번호' },
    ];

    const checkboxOptions = [
        { value: '전체', label: '전체' },
        { value: '예약 중', label: '예약 중' },
        { value: '사용 종료', label: '사용 종료' },
        { value: '취소', label: '취소' },
        { value: '결제 대기', label: '결제 대기' },
    ];

    const handleSearch = (searchData) => {
        console.log('검색 데이터:', searchData);
    };

    const handleSaveRoomChanges = () => {
        // 예약 확인 처리 로직
    };

    const handleCancellRoomChanges = () => {
        // 예약 취소 처리 로직
    };

    const handleReset = () => {
        // 초기화 로직
    };

    const handleSelectChange = (index) => {
        setRooms((prevRooms) => {
            const updatedRooms = [...prevRooms];
            updatedRooms[index] = {
                ...updatedRooms[index],
                select: !updatedRooms[index].select,
            };
            return updatedRooms;
        });
    };

    return (
        <div className={styles.allcontain}>
            <div className={styles.title}>
                <Managertitle title={"예약 정보 확인"} />
            </div>

            <div className={styles.search_section}>
                <Searchservation
                    fields={fields}
                    checkboxOptions={checkboxOptions}
                    onSearch={handleSearch}
                    onReset={handleReset}
                />
            </div>

            <div className={styles.selecttotal}>
                <Dateselect text={"목록"} totalnum={totalRooms} />
            </div>

            <div className={styles.table}>
                <button onClick={handleSaveRoomChanges} className={styles.savebutton}>예약 확인 처리</button>
                <button onClick={handleCancellRoomChanges} className={styles.savebutton}>예약 취소 처리</button>
                <div className={styles.table_container}>
                    <table>
                        <thead>
                        <tr>
                            <th>선택</th>
                            <th>방번호</th>
                            <th>결제 번호</th>
                            <th>대여자 명</th>
                            <th>예약 시간</th>
                            <th>누적 예약 횟수</th>
                            <th>예약자 수</th>
                            <th>방 이름</th>
                            <th>결제 일시</th>
                            <th>대여 가격</th>
                            <th>할인가</th>
                            <th>클레임 상태</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rooms.map((row, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={row.select}
                                        onChange={() => handleSelectChange(index)}
                                    />
                                </td>
                                <td>{row.roomNumber}</td>
                                <td>{row.paymentNumber}</td>
                                <td>{row.renterName}</td>
                                <td>{row.reservationTime}</td>
                                <td>{row.accumulatedReservations}</td>
                                <td>{row.numberOfRenters}</td>
                                <td>{row.roomName}</td>
                                <td>{row.paymentDate}</td>
                                <td>{row.rentalPrice}</td>
                                <td>{row.discountPrice}</td>
                                <td>{row.claimStatus}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            <div className={roomstyles.room_table}>
                <button onClick={openModal}>검색</button>

                {isOpen && (
                    <div className={roomstyles.modal}>
                        <div className={roomstyles.modaltitle}><h2>예약 정보 조회</h2></div>
                        <div className={roomstyles.modal_content}>

                            <div className={roomstyles.modaldetailcontent}>
                                <h3>예약 상세 정보</h3>
                                <div className={roomstyles.modalnumber}>
                                    <p>예약 번호: </p>
                                    <div className={roomstyles.realnumber}>202412121321</div>

                                </div>

                                <div className={roomstyles.room_table_container}>
                                    {rooms.map((room, index) => (
                                        <table key={index} className={roomstyles.room_table}>
                                            <tbody>
                                            <tr>
                                                <th>방 이름</th>
                                                <td>{room.roomName}</td>
                                                <th>전화번호</th>
                                                <td>{room.phoneNumber}</td>
                                            </tr>
                                            <tr>
                                                <th>방 번호</th>
                                                <td>{room.roomNumber}</td>
                                                <th>대여자 ID</th>
                                                <td>{room.userId}</td>
                                            </tr>
                                            <tr>
                                                <th>대여자명</th>
                                                <td>{room.renterName}</td>
                                                <th>예약 시간</th>
                                                <td>{room.reservationTime}</td>
                                            </tr>
                                            <tr>
                                                <th>결제 상태</th>
                                                <td>{room.paymentStatus}</td>
                                                <th>대여 가격</th>
                                                <td>{room.rentalPrice}</td>
                                            </tr>
                                            <tr>
                                                <th>결제 확인일</th>
                                                <td>{room.paymentDate}</td>
                                                <th>예약 확인일</th>
                                                <td>{room.reservationDate}</td>
                                            </tr>
                                            <tr>
                                                <th>누적 예약 횟수</th>
                                                <td>{room.accumulatedReservations}</td>
                                                <th>예약자 수</th>
                                                <td>{room.numberOfRenters}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    ))}
                                </div>
                            </div>
                            <div className={roomstyles.closemodal}>
                                <button onClick={closeModal}>닫기</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            </div>
        </div>
    );
};

export default Reservationinfo;
