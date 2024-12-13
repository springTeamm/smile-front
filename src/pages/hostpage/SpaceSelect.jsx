import React, { useEffect, useState } from 'react';
import axios from "axios";
import styles from "../hostpagecss/Cancellmanagement.module.css";
import textstyles from "../hostpagecss/textmodal.module.css";
import Selectcomponent from "../../components/host/Selectcomponent";
import Managericon from "../../components/host/hostricon";
import Managertitle from "../../components/host/managertitle";

const SpaceSelect = () => {
    const [roomList, setRoomList] = useState([]);
    const [filteredRoomList, setFilteredRoomList] = useState([]);
    const [selectedRoomIds, setSelectedRoomIds] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchRoomList = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/hostpage/spacelist');
                setRoomList(response.data || []);
                setFilteredRoomList(response.data || []);
            } catch (error) {
                console.error("데이터 로드 실패:", error);
            }
        };

        fetchRoomList();
    }, []);

    const handleSearch = (searchCriteria) => {
        const { roomName, roomNumber, status } = searchCriteria;
        let filtered = [...roomList];

        if (roomName) {
            filtered = filtered.filter((room) =>
                room.roomName.toLowerCase().includes(roomName.toLowerCase())
            );
        }

        if (roomNumber) {
            filtered = filtered.filter((room) =>
                room.roomNumber.toString().includes(roomNumber)
            );
        }

        if (status && status.length > 0 && !status.includes("전체")) {
            filtered = filtered.filter((room) => status.includes(room.displayStatus));
        }

        setFilteredRoomList(filtered);
    };

    const handleReset = () => {
        setFilteredRoomList(roomList);
    };

    const handleCheckboxChange = (roomId) => {
        setSelectedRoomIds((prevSelected) => {
            if (!Array.isArray(prevSelected)) {
                prevSelected = [];
            }
            return prevSelected.includes(roomId)
                ? prevSelected.filter((id) => id !== roomId)
                : [...prevSelected, roomId];
        });
    };

    const handleDeleteSelectedRooms = async () => {
        if (selectedRoomIds.length === 0) {
            alert("삭제할 항목을 선택해주세요.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/hostpage/spacelist/deleteRooms", {
                roomIds: selectedRoomIds,
            });

            if (response.status === 200) {
                alert("선택된 방이 삭제되었습니다.");
                const updatedRooms = roomList.filter(
                    (room) => !selectedRoomIds.includes(room.roomNumber)
                );
                setRoomList(updatedRooms);
                setFilteredRoomList(updatedRooms);
                setSelectedRoomIds([]);
            }
        } catch (error) {
            console.error("삭제 중 오류 발생:", error);
            alert("방 삭제 중 오류가 발생했습니다.");
        }
    };

    const handleEditClick = (room) => {
        setSelectedRoom({ ...room });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedRoom(null);
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedRoom((prevRoom) => ({
            ...prevRoom,
            [name]: value,
        }));
    };

    const handleUpdateRoom = async () => {
        if (!selectedRoom) {
            alert("수정할 방을 선택해주세요.");
            return;
        }

        try {
            const currentDateTime = new Date().toISOString().slice(0, -1); // Z를 제거

            const payload = {
                roomNumber: selectedRoom.roomNumber,
                roomName: selectedRoom.roomName,
                prUseable: selectedRoom.prUseable,
                locationName: selectedRoom.locationName,
                rentalPrice: parseInt(selectedRoom?.rentalPrice || 0, 10), // 숫자로 변환
                discountPrice: parseInt(selectedRoom?.discountPrice || 0, 10), // 숫자로 변환
                displayStatus: selectedRoom.displayStatus,
                lastModifiedDate: currentDateTime, // 수정된 형식
            };

            const response = await axios.put(
                "http://localhost:5000/api/hostpage/spacelist/updateRoom",
                payload
            );

            if (response.status === 200) {
                alert("방 정보가 성공적으로 수정되었습니다.");
                const updatedRooms = roomList.map((room) =>
                    room.roomNumber === selectedRoom.roomNumber
                        ? { ...room, ...selectedRoom }
                        : room
                );

                setRoomList(updatedRooms);
                setFilteredRoomList(updatedRooms);
                closeModal();
            } else {
                alert("방 정보 수정에 실패했습니다.");
            }
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            alert("방 정보 수정 중 오류가 발생했습니다.");
        }
    };


    const totalRooms = filteredRoomList.length;

    return (
        <div className={styles.allcontain}>
            <div className={styles.title}>
                <Managertitle title={"공간조회/수정"} />
            </div>
            <div className={styles.icon}>
                <Managericon
                    totalRooms={totalRooms}
                    waitingApproval={filteredRoomList.filter((room) => room.displayStatus === "승인 대기").length}
                    rentingNow={filteredRoomList.filter((room) => room.displayStatus === "대여 중").length}
                    rentalStopped={filteredRoomList.filter((room) => room.displayStatus === "대여 가능").length}
                />
            </div>
            <div className={styles.search_section}>
                <Selectcomponent
                    fields={[
                        { name: "roomName", label: "방 이름", type: "text" },
                        { name: "roomNumber", label: "방 번호", type: "text" },
                        {
                            name: "status",
                            label: "방 상태",
                            type: "checkbox",
                            options: [
                                { value: "전체", label: "전체" },
                                { value: "대여 가능", label: "대여 가능" },
                                { value: "대여 중", label: "대여 중" },
                                { value: "대여 중지", label: "대여 중지" },
                                { value: "승인 대기", label: "승인 대기" },
                            ],
                        },
                    ]}
                    onSearch={handleSearch}
                    onReset={handleReset}
                />
            </div>
            <div className={styles.selecttotal}>
                <h3>
                    방 목록 (총 <span className={styles.totaluserHighlight}>{totalRooms}</span>개)
                </h3>
            </div>
            <div className={styles.table}>
                <div className={styles.totalbutton}>
                    <button
                        className={styles.savebutton}
                        onClick={handleDeleteSelectedRooms}
                        disabled={!Array.isArray(selectedRoomIds) || selectedRoomIds.length === 0}
                    >
                        선택 삭제
                    </button>
                </div>
                <div className={styles.table_container}>
                    <table>
                        <thead>
                        <tr>
                            <th>선택</th>
                            <th>수정</th>
                            <th>방 번호</th>
                            <th>방 이름</th>
                            <th>대여 가격</th>
                            <th>할인가</th>
                            <th>상태</th>
                            <th>등록일</th>
                            <th>수정일</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(filteredRoomList) &&
                            filteredRoomList.map((room) => (
                                <tr key={String(room.roomNumber)}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedRoomIds.includes(room.roomNumber)}
                                            onChange={() => handleCheckboxChange(room.roomNumber)}
                                        />
                                    </td>
                                    <td>
                                        <button
                                            className={styles.su}
                                            onClick={() => handleEditClick(room)}
                                        >
                                            수정
                                        </button>
                                    </td>
                                    <td>{room.roomNumber}</td>
                                    <td>{room.roomName}</td>
                                    <td>{room.rentalPrice} 원</td>
                                    <td>{room.discountPrice} 원</td>
                                    <td>{room.displayStatus}</td>
                                    <td>{new Date(room.registeredDate).toLocaleString()}</td>
                                    <td>{new Date(room.lastModifiedDate).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && (
                <div className={textstyles.modal}>
                    <div className={textstyles.modaltotal}>
                        <h3>방 정보 수정</h3>
                        <div className={textstyles.modalContent}>
                            <div className={textstyles.inputContainer}>
                                <label>방 호수:</label>
                                <input
                                    type="text"
                                    name="roomName"
                                    value={selectedRoom?.roomName || ""}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={textstyles.inputContainer}>
                                <label>연습실 사용가능 여부:</label>
                                <input
                                    type="text"
                                    name="prUseable"
                                    value={selectedRoom.prUseable || ""}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={textstyles.inputContainer}>
                                <label>장소 이름:</label>
                                <input
                                    type="text"
                                    name="locationName"
                                    value={selectedRoom.locationName || ""}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={textstyles.inputContainer}>
                                <label>대여 가격:</label>
                                <input
                                    type="number"
                                    name="rentalPrice"
                                    value={selectedRoom.rentalPrice || ""}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={textstyles.inputContainer}>
                                <label>할인가:</label>
                                <input
                                    type="number"
                                    name="discountPrice"
                                    value={selectedRoom.discountPrice || ""}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={textstyles.inputContainer}>
                                <label>전시 상태:</label>
                                <input
                                    type="text"
                                    name="displayStatus"
                                    value={selectedRoom.displayStatus || ""}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={textstyles.buttonGroup}>
                                <button
                                    onClick={handleUpdateRoom}
                                    className={textstyles.savebutton}
                                >
                                    저장
                                </button>
                                <button
                                    onClick={closeModal}
                                    className={textstyles.cancelbutton}
                                >
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

export default SpaceSelect;
