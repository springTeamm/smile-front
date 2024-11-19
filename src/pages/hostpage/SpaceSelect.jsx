import React, { useEffect, useState, useCallback } from 'react';
import Selectcomponent from "../../components/host/Selectcomponent";
import Managericon from "../../components/host/hostricon";
import Managertitle from "../../components/host/managertitle";
import styles from "../hostpagecss/Cancellmanagement.module.css";

const SpaceSelect = () => {
    const [rooms, setRooms] = useState([]);  // 전체 방 데이터
    const [filteredRooms, setFilteredRooms] = useState([]);  // 필터링된 방 목록
    const [selectedRooms, setSelectedRooms] = useState([]);  // 선택된 방 목록
    const [editRoomId, setEditRoomId] = useState(null); // 수정 중인 방 ID

    useEffect(() => {
        // 로컬 데이터 초기화
        const initialRooms = [
            { id: 1, roomNumber: '101', roomName: 'A룸', rentalPrice: 10000, discountPrice: 8000, sellerDiscountPrice: 5000, status: '대여 중', modifyDate: '2024-01-01T12:35:00', createDate: '2023-12-01T10:20:00' },
            { id: 2, roomNumber: '102', roomName: 'B룸', rentalPrice: 12000, discountPrice: 10000, sellerDiscountPrice: 6000, status: '대여 중지', modifyDate: '2024-01-02T14:40:00', createDate: '2023-11-20T15:30:00' },
            { id: 3, roomNumber: '103', roomName: 'C룸', rentalPrice: 15000, discountPrice: 13000, sellerDiscountPrice: 7000, status: '승인 대기', modifyDate: '2024-01-03T09:50:00', createDate: '2023-11-15T11:15:00' }
        ];
        setRooms(initialRooms);
        setFilteredRooms(initialRooms);  // 필터링 초기 상태는 전체 방 목록
    }, []);

    const handleFilterChange = useCallback((filterData) => {
        const { roomName, roomNumber, status } = filterData;
        const filtered = rooms.filter(room => {
            const matchName = roomName ? room.roomName.includes(roomName) : true;
            const matchNumber = roomNumber ? room.roomNumber.includes(roomNumber) : true;
            const matchStatus = status.length === 0 || status.includes(room.status);
            return matchName && matchNumber && matchStatus;
        });
        setFilteredRooms(filtered);
    }, [rooms]);

    const handleSelectRoom = (id) => {
        setSelectedRooms(prevSelected =>
            prevSelected.includes(id) ? prevSelected.filter(roomId => roomId !== id) : [...prevSelected, id]
        );
    };

    const handleDeleteSelectedRooms = () => {
        const remainingRooms = rooms.filter(room => !selectedRooms.includes(room.id));
        setRooms(remainingRooms);
        setFilteredRooms(remainingRooms);
        setSelectedRooms([]);
    };

    const totalRooms = filteredRooms.length;
    const waitingApproval = filteredRooms.filter(room => room.status === '승인 대기').length;
    const rentingNow = filteredRooms.filter(room => room.status === '대여 중').length;
    const rentalStopped = filteredRooms.filter(room => room.status === '대여 중지').length;

    const handleEditRoom = (id) => {
        setEditRoomId(id);
    };

    const handleSaveRoomChanges = () => {
        alert("수정된 항목 저장");
        setEditRoomId(null);
    };

    const handleStatusChange = () => {
        alert(``);
    };

    const searchFields = [
        { name: 'roomName', label: '방 이름', type: 'text' },
        { name: 'roomNumber', label: '방 번호 ', type: 'text' },
        {
            name: 'status',
            label: '방 상태',
            type: 'checkbox',
            options: [
                { value: '대여 가능', label: '대여 가능' },
                { value: '대여 중', label: '대여 중' },
                { value: '대여 중지', label: '대여 중지' },
                { value: '승인 대기', label: '승인 대기' }
            ]
        },
        {
            name: 'sectopm',
            label: '방 유형',
            type: 'checkbox',
            options: [
                { value: '00 연습실', label: '00 연습실' },
                { value: '00 연습실', label: '00 연습실' }

            ]
        },
    ];

    return (
        <div className={styles.allcontain}>
            <div className={styles.title}>
                <Managertitle title={"공간조회/수정"} />
            </div>
            <div className={styles.icon}>
                <Managericon
                    totalRooms={totalRooms}
                    waitingApproval={waitingApproval}
                    rentingNow={rentingNow}
                    rentalStopped={rentalStopped}
                />
            </div>

            <div className={styles.search_section}>
                <Selectcomponent fields={searchFields} onFilterChange={handleFilterChange} />
            </div>
            <div className={styles.selecttotal}>
                <h3>방 목록 (총 {totalRooms}개)</h3>
            </div>
            <div className={styles.table}>
                <button onClick={handleDeleteSelectedRooms} disabled={selectedRooms.length === 0}>
                    선택 삭제
                </button>
                <select onChange={(e) => handleStatusChange(e.target.value)} defaultValue="">
                    <option value="" disabled>상태 변경</option>
                    <option value="대여 중">대여 중</option>
                    <option value="대여 중지">대여 중지</option>
                </select>
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
                            <th>판매자 할인</th>
                            <th>상태</th>
                            <th>등록일</th>
                            <th>수정일</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredRooms.map(room => (
                            <tr key={room.id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedRooms.includes(room.id)}
                                        onChange={() => handleSelectRoom(room.id)}
                                    />
                                </td>
                                <td>
                                    <button className={styles.su} onClick={() => handleEditRoom(room.id)}>
                                        수정
                                    </button>
                                </td>
                                <td>{room.roomNumber}</td>
                                <td>{room.roomName}</td>
                                <td>{room.rentalPrice} 원</td>
                                <td>{room.discountPrice} 원</td>
                                <td>{room.sellerDiscountPrice} 원</td>
                                <td>{room.status}</td>
                                <td>{room.createDate}</td>
                                <td>{room.modifyDate}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className={styles.save_container}>
                        <button onClick={handleSaveRoomChanges} className={styles.button}>수정 항목 저장</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpaceSelect;
