import React, { useEffect, useState } from "react";
import styles from "../hostpagecss/Cancellmanagement.module.css";
import Managertitle from "../../components/host/managertitle";
import Dateselect from "../../components/host/dateselect";
import Searchcomponent from "../../components/host/Selectcomponent";
import textmodalStyles from "../hostpagecss/textmodal.module.css";
import axios from "axios";
import Selectcomponent from "../../components/host/Selectcomponent";

const Reservationinfo = () => {
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
   const [modalType, setModalType] = useState("");
    const [selectedRooms, setSelectedRooms] = useState([]); // 체크된 항목 관리
    const [filteredRoomList, setFilteredRoomList] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
    const [reservationData, setReservationData] = useState({
        userNum: "",
        roomNum: "",
        startDate: "",
        endDate: "",
        userName: "",
        userPhone: "",
        totalPrice: "",
    });
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/hostpage/rooms/my-rooms/bookings");
                console.log("API Response:", response.data); // 데이터 구조 확인
                setRooms(response.data);
                setFilteredRoomList(response.data); // 필터링 데이터 초기화
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
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReservationData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddReservations = async () => {
        const { userNum, prNum, bookingTotalPerson, bookingTotalPrice, bookingUsingTime, bookingPaymentMethod } = reservationData;

        if (!userNum || !prNum) {
            alert("사용자 번호와 방 번호를 입력해주세요.");
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:5000/api/hostpage/users/${userNum}/rooms/${prNum}/booking`,
                {
                    bookingTotalPerson,
                    bookingTotalPrice,
                    bookingUsingTime,
                    bookingPaymentMethod,
                }
            );

            if (response.status === 201 || response.status === 200) {
                alert("예약이 성공적으로 추가되었습니다.");
                setIsModalOpen(false); // 모달 닫기
                setRooms((prevRooms) => [...prevRooms, response.data]); // 새 예약 추가
            } else {
                alert("예약 추가에 실패했습니다.");
            }
        } catch (error) {
            console.error("예약 추가 중 오류 발생:", error);
            alert("예약 추가 중 오류가 발생했습니다.");
        }
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
            const response = await axios.post("http://localhost:5000/api/hostpage/rooms/my-rooms/bookings/cancel", {
                bookingNums: selectedRooms, // bookingNum 리스트 전달
            });

            if (response.status === 200) {
                alert("선택된 예약이 취소되었습니다.");
                setRooms((prevRooms) => prevRooms.filter((room) => !selectedRooms.includes(room.bookingNum)));
                setSelectedRooms([]); // 선택 초기화
            }
        } catch (error) {
            console.error("Failed to cancel reservations", error);
            alert("예약 취소 중 오류가 발생했습니다.");
        }
    };
    const handleSearch = (searchData) => {
        const { userName, userPhone, prUseable } = searchData;
        let filtered = [...rooms];

        // 고객명 필터링
        if (userName) {
            filtered = filtered.filter((room) =>
                room.userName.toLowerCase().includes(userName.toLowerCase())
            );
        }

        // 전화번호 필터링
        if (userPhone) {
            filtered = filtered.filter((room) =>
                room.userPhone.toString().includes(userPhone)
            );
        }

        // 상태 필터링
        if (prUseable && prUseable.length > 0) {
            filtered = filtered.filter((room) =>
                prUseable.includes(room.prUseable)
            );

        }

        setFilteredRoomList(filtered); // 필터링된 결과 업데이트
    };


    const handleReset = () => {
        setFilteredRoomList(rooms); // 초기 목록으로 복원
    };

    const handleDateFilter = (startDate, endDate) => {
        const filtered = rooms.filter((room) => {
            const bookingDate = new Date(room.bookingDate);
            return bookingDate >= startDate && bookingDate <= endDate;
        });
        setFilteredRoomList(filtered);
    };


    return (
        <div className={styles.allcontain}>
            <div className={styles.title}>
                <Managertitle title={"예약 정보 확인"} />
            </div>

            <div className={styles.search_section}>
                <Selectcomponent
                    fields={[
                        { name: "userName", label: "고객명", type: "text" },
                        { name: "userPhone", label: "전화번호", type: "text" },
                        {
                            name: "prUseable",
                            label: "상태",
                            type: "checkbox",
                            options: [
                                { value: "전체", label: "전체" },
                                { value: "예약 중", label: "예약 중" },
                                { value: "사용 종료", label: "사용 종료" },
                                { value: "결제 완료", label: "결제 완료" },
                                { value: "결제 대기", label: "결제 대기" },
                            ],
                        },
                    ]}
                    onSearch={handleSearch}
                    onReset={handleReset}
                /> </div>

            <div className={styles.selecttotal}>
                <Dateselect
                    text={"목록"}
                    totalnum={filteredRoomList.length}
                    onDateFilter={handleDateFilter}
                />
            </div>

            <div className={styles.table}>

                <button onClick={handleCancelReservations} className={styles.savebutton}>
                    예약 취소
                </button>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className={styles.savebutton}
                >
                    예약 추가
                </button>
                {isModalOpen && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <h3>예약 추가</h3>
                            <div className={styles.inputContainer}>
                                <label>사용자 번호:</label>
                                <input
                                    type="number"
                                    name="userNum"
                                    value={reservationData.userNum}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={styles.inputContainer}>
                                <label>방 번호:</label>
                                <input
                                    type="number"
                                    name="prNum"
                                    value={reservationData.prNum}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={styles.inputContainer}>
                                <label>예약 총 인원:</label>
                                <input
                                    type="number"
                                    name="bookingTotalPerson"
                                    value={reservationData.bookingTotalPerson}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={styles.inputContainer}>
                                <label>총 가격:</label>
                                <input
                                    type="number"
                                    name="bookingTotalPrice"
                                    value={reservationData.bookingTotalPrice}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={styles.inputContainer}>
                                <label>사용 시간:</label>
                                <input
                                    type="number"
                                    name="bookingUsingTime"
                                    value={reservationData.bookingUsingTime}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={styles.inputContainer}>
                                <label>결제 방법:</label>
                                <input
                                    type="text"
                                    name="bookingPaymentMethod"
                                    value={reservationData.bookingPaymentMethod}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={styles.buttonContainer}>
                                <button
                                    onClick={handleAddReservations}
                                    className={styles.savebutton}
                                >
                                    추가
                                </button>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className={styles.cancelbutton}
                                >
                                    취소
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className={styles.table_container}>
                    <table>
                        <thead>
                        <tr>
                            <th>선택</th>
                            <th>방번호</th>
                            <th>결제 번호</th>
                            <th>고객 명</th>
                            <th>예약 시간</th>
                            <th>예약자 수</th>
                            <th>방 이름</th>
                            <th>결제 일시</th>
                            <th>대여 가격</th>

                            <th>전화 번호</th>
                            <th>상태</th>

                        </tr>
                        </thead>
                        <tbody>
                        {filteredRoomList.map((room) => (
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
                                <td>{room.bookingTotalPerson}</td>
                                <td>{room.locationName}</td>
                                <td>{room.payDate}</td>
                                <td>{room.payPrice}</td>
                                <td>{room.userPhone}</td>
                                <td>{room.prUseable}</td>
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
