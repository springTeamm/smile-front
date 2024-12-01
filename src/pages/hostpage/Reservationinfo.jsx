import React, { useEffect, useState } from "react";
import styles from "../hostpagecss/Cancellmanagement.module.css";
import Managertitle from "../../components/host/managertitle";
import Dateselect from "../../components/host/dateselect";
import Searchcomponent from "../../components/host/Selectcomponent";
import textmodalStyles from "../hostpagecss/textmodal.module.css";
import axios from "axios";

const Reservationinfo = () => {
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");
    const [selectedRooms, setSelectedRooms] = useState([]); // 체크된 항목 관리

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/hostpage/rooms/my-rooms/bookings");
                setRooms(response.data);
            } catch (error) {
                console.error("Failed to fetch reservations", error);
            }
        };
        fetchRooms();
    }, []);

    const closeModal = () => {
        setIsModalOpen(false);
        setModalType("");
    };

    const handleAction = (type) => {
        if (!selectedRoom) {
            alert("처리할 항목을 선택해주세요.");
            return;
        }
        setModalType(type);
        setIsModalOpen(true);
    };

    const handleCheckboxChange = (bookingNum) => {
        setSelectedRooms((prevSelected) =>
            prevSelected.includes(bookingNum)
                ? prevSelected.filter((id) => id !== bookingNum) // 선택 해제
                : [...prevSelected, bookingNum] // 선택 추가
        );
    };

    const handleCancelReservations = async () => {
        if (selectedRooms.length === 0) {
            alert("취소할 항목을 선택해주세요.");
            return;
        }
        try {
            // POST 요청으로 삭제 데이터 전달
            await axios.post("http://localhost:5000/api/hostpage/rooms/my-rooms/bookings/delete", selectedRooms);
            alert("선택된 예약이 취소되었습니다.");
            setRooms((prevRooms) => prevRooms.filter((room) => !selectedRooms.includes(room.bookingNum))); // 삭제 후 화면 갱신
            setSelectedRooms([]); // 선택 초기화
        } catch (error) {
            console.error("Failed to cancel reservations", error);
        }
    };


    const handleSelectRoom = (room) => {
        setSelectedRoom(room);
    };

    const searchFields = [
        { name: "customerName", label: "고객명", type: "text" },
        { name: "phoneNumber", label: "전화번호", type: "text" },
        {
            name: "reservationStatus",
            label: "상태",
            type: "checkbox",
            options: [
                { value: "전체", label: "전체" },
                { value: "예약 중", label: "예약 중" },
                { value: "사용 종료", label: "사용 종료" },
                { value: "취소", label: "취소" },
                { value: "결제 대기", label: "결제 대기" },
            ],
        },
    ];

    return (
        <div className={styles.allcontain}>
            <div className={styles.title}>
                <Managertitle title={"예약 정보 확인"} />
            </div>

            <div className={styles.search_section}>
                <Searchcomponent fields={searchFields} onSearch={() => {}} onReset={() => {}} />
            </div>

            <div className={styles.selecttotal}>
                <Dateselect text={"목록"} totalnum={rooms.length} />
            </div>

            <div className={styles.table}>

                <button onClick={handleCancelReservations} className={styles.savebutton}>
                    예약 취소
                </button>

                <div className={styles.table_container}>
                    <table>
                        <thead>
                        <tr>
                            <th>선택</th>
                            <th>방번호</th>
                            <th>결제 번호</th>
                            <th>대여자 명</th>
                            <th>예약 시간</th>
                            <th>방 이름</th>
                            <th>결제 일시</th>
                            <th>대여 가격</th>
                            <th>예약자 수</th>
                            <th>클레임 상태</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rooms.map((room) => (
                            <tr key={room.bookingNum}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedRooms.includes(room.bookingNum)}
                                        onChange={() => handleCheckboxChange(room.bookingNum)}
                                    />
                                </td>
                                <td>{room.prName}</td>
                                <td>{room.payNum}</td>
                                <td>{room.userName}</td>
                                <td>{room.bookingDate}</td>
                                <td>{room.locationName}</td>
                                <td>{room.payDate}</td>
                                <td>{room.payPrice}</td>
                                <td>{room.bookingTotalPerson}</td>
                                <td>{room.claimStatus}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Reservationinfo;
