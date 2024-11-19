import React, { useEffect, useState } from 'react';
import styles from "../hostpagecss/Cancellmanagement.module.css";
import Managertitle from "../../components/host/managertitle";
import Dateselect from "../../components/host/dateselect";
import Searchcomponent from "../../components/host/Selectcomponent";
import textmodalStyles from "../hostpagecss/textmodal.module.css";

const Reservationinfo = () => {
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");

    useEffect(() => {
        const fetchRooms = async () => {
            const rooms = [
                {
                    id: 1,
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
                    claimStatus: "없음",
                },
                {
                    id: 2,
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
                    claimStatus: "있음",
                },
            ];
            setRooms(rooms);
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

    const handleConfirmAction = () => {
        alert(`${modalType === "confirm" ? "예약 확인" : "예약 취소"} 처리가 완료되었습니다.`);
        closeModal();
    };

    const handleSelectRoom = (room) => {
        setSelectedRoom(room);
    };

    const searchFields = [
        { name: 'customerName', label: '고객명', type: 'text' },
        { name: 'phoneNumber', label: '전화번호', type: 'text' },
        {
            name: 'reservationStatus',
            label: '상태',
            type: 'checkbox',
            options: [
                { value: '전체', label: '전체' },
                { value: '예약 중', label: '예약 중' },
                { value: '사용 종료', label: '사용 종료' },
                { value: '취소', label: '취소' },
                { value: '결제 대기', label: '결제 대기' },
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
                <button
                    onClick={() => handleAction("confirm")}
                    className={styles.savebutton}
                >
                    예약 확인 처리
                </button>
                <button
                    onClick={() => handleAction("cancel")}
                    className={styles.savebutton}
                >
                    예약 취소 처리
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
                            <th>할인가</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rooms.map((room) => (
                            <tr key={room.id}>
                                <td>
                                    <input
                                        type="radio"
                                        name="selectedRoom"
                                        onChange={() => handleSelectRoom(room)}
                                    />
                                </td>
                                <td>{room.roomNumber}</td>
                                <td>{room.paymentNumber}</td>
                                <td>{room.renterName}</td>
                                <td>{room.reservationTime}</td>
                                <td>{room.roomName}</td>
                                <td>{room.paymentDate}</td>
                                <td>{room.rentalPrice}</td>
                                <td>{room.discountPrice}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className={textmodalStyles.modal}>
                    <div className={textmodalStyles.modaltotal}>
                        <div className={textmodalStyles.modalTitle}>
                            <h3 style={{whiteSpace: "pre-line"}}>
                                {modalType === "confirm"
                                    ? "예약 확인 처리를 하시겠습니까? \n  거부시 패널티가 부과될 수 있습니다."
                                    : "호스트 직권 취소 처리를 하시겠습니까? \n패널티가 부과될 수 있습니다."}
                            </h3>
                            <p style={{whiteSpace: "pre-line"}}>
                                {modalType === "confirm"
                                    ? "(거부 처리는 예약 직접 취소 처리를 통해 가능하며 \n대여자와 합의가 된 상태에서 하지 않을 시 \n패널티가 부과될 수 있습니다.) "
                                    : "(호스트 직권 취소는 대여자와 합의가 된 상태에서 하지 않을 시 \n패널티가 부과될 수 있습니다.)"}
                            </p>
                        </div>

                        <div className={textmodalStyles.modalContent}>
                            {modalType === "cancel" && (

                                <>


                                    <select>
                                        <option value="default">사유</option>
                                        <option value="중복">예약 중복</option>
                                    <option value="개인사정">개인 사정</option>
                                    <option value="예약불가">예약 불가</option>
                                    <option value="기타">기타</option>
                                </select>
                                <textarea placeholder="사유를 작성해주세요"/>
                                <p>
                                    환불 금액: <strong>{selectedRoom?.rentalPrice}</strong>
                                </p>
                            </>
                        )}

                        <div className={textmodalStyles.buttonGroup}>
                            <button onClick={handleConfirmAction} className={textmodalStyles.savebutton}>
                                확인
                            </button>
                            <button onClick={closeModal} className={textmodalStyles.cancelbutton}>
                                취소
                            </button>
                        </div>
                    </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reservationinfo;
