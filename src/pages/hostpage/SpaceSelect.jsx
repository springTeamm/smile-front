import React, { useEffect, useState } from 'react';
import Selectcomponent from "../../components/host/Selectcomponent";
import Managericon from "../../components/host/hostricon";
import Managertitle from "../../components/host/managertitle";
import styles from "../hostpagecss/Cancellmanagement.module.css";
import axios from "axios";

const SpaceSelect = () => {
    const [roomList, setRoomList] = useState([]); // 전체 방 데이터
    const [filteredRoomList, setFilteredRoomList] = useState([]); // 필터링된 방 목록
    const [selectedRoomIds, setSelectedRoomIds] = useState([]); // 체크된 방 목록
    const [selectedRoom, setSelectedRoom] = useState(null); // 수정 모달에서 선택된 방
    const [isModalOpen, setIsModalOpen] = useState(false); // 수정 모달 상태
    const [selectedStatus, setSelectedStatus] = useState(""); // 선택된 상태
    // 데이터 가져오기
    useEffect(() => {
        const fetchRoomList = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/hostpage/spacelist');
                console.log(response.data); // 데이터 확인
                setRoomList(response.data); // 문자열로 상태가 이미 온다고 가정
                setFilteredRoomList(response.data); // 초기에는 전체 목록
            } catch (error) {
                console.error("데이터 로드 실패:", error);
            }
        };

        fetchRoomList();
    }, []);

    // 검색 핸들러
    const handleSearch = (searchCriteria) => {
        const { roomName, roomNumber, status } = searchCriteria;
        let filtered = [...roomList];

        // 방 이름 필터링
        if (roomName) {
            filtered = filtered.filter((room) =>
                room.roomName.toLowerCase().includes(roomName.toLowerCase())
            );
        }

        // 방 번호 필터링
        if (roomNumber) {
            filtered = filtered.filter((room) =>
                room.roomNumber.toString().includes(roomNumber)
            );
        }

        if (status && status.length > 0) {
            if (!status.includes("전체")) {
                filtered = filtered.filter((room) => status.includes(room.displayStatus));
            }
        }

        setFilteredRoomList(filtered);  // 필터링된 결과 업데이트
    };
    // 초기화
    const handleReset = () => {
        setFilteredRoomList(roomList); // 초기 목록으로 복원
    };

    const handleStatusChange = (status) => {
        setSelectedStatus(status);
        if (status === "" ) {
            setFilteredRoomList(roomList); // 전체 보기
        } else {
            const filtered = roomList.filter(room => room.displayStatus === status);
            setFilteredRoomList(filtered);
        }
    };
    // 수정 모달 열기
    const handleEditClick = (room) => {
        setSelectedRoomIds({ ...room }); // 선택된 방 정보 저장
        setIsModalOpen(true);
    };

    // 모달 닫기
    const closeModal = () => {
        setSelectedRoomIds(null);
        setIsModalOpen(false);
    };


    // 입력값 변경
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedRoom((prevRoom) => ({
            ...prevRoom,
            [name]: value,
        }));
    };


    // 방 정보 수정 요청
    const handleUpdateRoom = async () => {
        if (!selectedRoom) return;

        try {
            const response = await axios.post(
                `http://localhost:5000/api/hostpage/spacelist/updateRoom`,
                selectedRoom
            );

            if (response.status === 200) {
                alert("방 정보가 수정되었습니다.");
                const updatedRooms = roomList.map((room) =>
                    room.roomNumber === selectedRoom.roomNumber ? selectedRoom : room
                );
                setRoomList(updatedRooms);
                setFilteredRoomList(updatedRooms);
                closeModal();
            } else {
                alert("방 정보 수정에 실패했습니다.");
            }
        } catch (error) {
            console.error("방 정보 수정 중 오류 발생:", error);
            alert("방 정보 수정 중 오류가 발생했습니다.");
        }
    };


    // 선택된 방 체크박스
    const handleCheckboxChange = (roomId) => {
        setSelectedRoomIds((prevSelected) =>
            prevSelected.includes(roomId)
                ? prevSelected.filter((id) => id !== roomId)
                : [...prevSelected, roomId]
        );
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

    // UI 관련 데이터
    const totalRooms = filteredRoomList.length;
    const waitingApproval = filteredRoomList.filter(room => room.displayStatus === "승인 대기").length;
    const rentingNow = filteredRoomList.filter(room => room.displayStatus === "대여 중").length;
    const rentalStopped = filteredRoomList.filter(room => room.displayStatus === "대여 중지").length;

    return (
        <div className={styles.allcontain}>
            <div className={styles.title}>
                <Managertitle title={"공간조회/수정"}/>
            </div>
            <div className={styles.icon}>
                <Managericon
                    totalRooms={filteredRoomList.length}
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
                                {value: "전체",label: "전체"},
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
                <h3>방 목록 (총 <span className={styles.totaluserHighlight}>{totalRooms}</span>개)</h3>
            </div>

            <div className={styles.table}>
                <div className={styles.totalbutton}>
                    <button className={styles.savebutton} onClick={handleDeleteSelectedRooms}
                            disabled={selectedRoomIds.length === 0}>
                        선택 삭제
                    </button>
                    <select className={styles.savebutton} onChange={(e) => handleStatusChange(e.target.value)}
                            defaultValue="">
                        <option value="">전체 보기</option>
                        <option value="대여 가능">대여 가능</option>
                        <option value="대여 중">대여 중</option>
                        <option value="대여 중지">대여 중지</option>
                        <option value="승인 대기">승인 대기</option>
                    </select>
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
                            <th>판매자 할인가격</th>
                            <th>상태</th>
                            <th>등록일</th>
                            <th>수정일</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredRoomList.map((room) => (
                            <tr key={room.roomNumber}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedRoomIds.includes(room.roomNumber)}
                                        onChange={() => handleCheckboxChange(room.roomNumber)}
                                    />
                                </td>
                                <td>
                                    <button className={styles.su} onClick={() => handleEditClick(room)}>
                                        수정
                                    </button>
                                </td>
                                <td>{room.roomNumber}</td>
                                <td>{room.roomName}</td>
                                <td>{room.rentalPrice} 원</td>
                                <td>{room.discountPrice} 원</td>
                                <td>{Number(room.rentalPrice) - Number(room.discountPrice)}</td>

                                <td>{room.displayStatus}</td>
                                <td>{new Date(room.registeredDate).toLocaleString()}</td>
                                <td>{new Date(room.lastModifiedDate).toLocaleString()}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* 수정 모달 */}
            {isModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h3>방 정보 수정</h3>
                        <div className={styles.inputContainer}>
                            <label>방 이름:</label>
                            <input
                                type="text"
                                name="roomName"
                                value={selectedRoom.roomName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <label>대여 가격:</label>
                            <input
                                type="number"
                                name="rentalPrice"
                                value={selectedRoom.rentalPrice}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <label>할인가:</label>
                            <input
                                type="number"
                                name="discountPrice"
                                value={selectedRoom.discountPrice}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <label>상태:</label>
                            <input
                                type="text"
                                name="displayStatus"
                                value={selectedRoom.displayStatus}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={styles.buttonContainer}>
                            <button onClick={handleUpdateRoom} className={styles.savebutton}>
                                저장
                            </button>
                            <button onClick={closeModal} className={styles.cancelbutton}>
                                취소
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SpaceSelect;
