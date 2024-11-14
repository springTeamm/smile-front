import React, { useEffect, useState } from 'react';
import Select from "../../components/host/Select";
import Sidebar from "../../components/host/Sidebar";

import Managericon from "../../components/host/managericon";
import Managertitle from "../../components/host/managertitle";
import "../hostpagecss/SpaceSelect.css"
const SpaceSelect = () => {
    const [rooms, setRooms] = useState([]);  // 방 목록 전체 데이터
    const [filteredRooms, setFilteredRooms] = useState([]);  // 필터링된 방 목록
    const [selectedRooms, setSelectedRooms] = useState([]);  // 선택된 방 목록
    const [editRoomId, setEditRoomId] = useState(null); // 수정 중인 방 ID

    useEffect(() => {
        // 데이터베이스에서 방 정보를 가져오는 예제
        const fetchRooms = async () => {
            const rooms = [
                {
                    id: 1,
                    roomNumber: '101',
                    roomName: '연습실 A',
                    rentalPrice: 10000,
                    discountPrice: 8000,
                    sellerDiscountPrice: 5000,
                    exhibitionStatus: '대여 중',
                    registrationDate: '2024-01-01',
                    modificationDate: '2024-01-10',
                },
                {
                    id: 2,
                    roomNumber: '102',
                    roomName: '연습실 B',
                    rentalPrice: 12000,
                    discountPrice: 10000,
                    sellerDiscountPrice: 6000,
                    exhibitionStatus: '대여 가능',
                    registrationDate: '2024-02-01',
                    modificationDate: '2024-02-05',
                },
            ];
            setRooms(rooms);
            setFilteredRooms(rooms);  // 초기 필터링을 전체 방 목록으로 설정
        };

        fetchRooms();
    }, []);

    const handleFilterChange = (roomName, roomNumber, exhibitionStatus) => {
        // 필터링 로직
        const filtered = rooms.filter(room => {
            const matchesName = roomName ? room.roomName.includes(roomName) : true;
            const matchesNumber = roomNumber ? room.roomNumber.includes(roomNumber) : true;
            const matchesStatus = exhibitionStatus.length === 0 || exhibitionStatus.some(status => room.exhibitionStatus === status);

            return matchesName && matchesNumber && matchesStatus;
        });
        setFilteredRooms(filtered);
    };

    const handleSelectRoom = (id) => {
        // 방 선택 시 상태 업데이트
        setSelectedRooms(prevSelected =>
            prevSelected.includes(id) ? prevSelected.filter(roomId => roomId !== id) : [...prevSelected, id]
        );
    };

    const handleDeleteSelectedRooms = () => {
        // 선택 삭제 로직 (백엔드 연동 필요)
    };

    const handleRegisterRoom = () => {
        //정보 등록 로직
        alert("정보 등록");
    };


    const totalRooms = filteredRooms.length;
    const waitingApproval=1;
    const rentingNow=1;
    const rentalStopped=1;// 데이터 베이스에서 대여중 대여중지 그런값 다 가져오기
/*    const waitingApproval = filteredRooms.filter(room => room.exhibitionStatus === '승인 대기').length;
    const rentingNow = filteredRooms.filter(room => room.exhibitionStatus === '대여 중').length;
    const rentalStopped = filteredRooms.filter(room => room.exhibitionStatus === '대여 중지').length;*/

    const handleEditRoom = (id) => {
        setEditRoomId(id); // 수정하려는 방 ID를 설정
    };

    const handleSaveRoomChanges = () => {
        // 수정한 항목을 저장 (백엔드 연동 필요)
        alert("수정 항목");
        setEditRoomId(null);
    };

    const handleStatusChange = (status) => {
        // 선택한 방들의 상태 변경 (백엔드 연동 필요)
        alert(`선택한 방들을 ${status} 상태로 변경`);
    };

    return (



                <div className="contain">
                    <Managertitle title={"공간조회/수정"}/>
                    <div className="icon">
                    <Managericon
                        totalRooms={totalRooms}
                        waitingApproval={waitingApproval}
                        rentingNow={rentingNow}
                        rentalStopped={rentalStopped}
                        handleRegisterRoom={handleRegisterRoom}
                    />
                    </div>

                    <div className="selectpoint"><Select onFilterChange={handleFilterChange}/></div>
                    <div className="title"><h3>방목록 (총 {totalRooms}개)</h3></div>
                    <div className="table">
                        <button onClick={handleDeleteSelectedRooms} disabled={selectedRooms.length === 0}>
                            선택 삭제
                        </button>
                        <select onChange={(e) => handleStatusChange(e.target.value)} defaultValue="">
                            <option value="" disabled>상태 변경</option>
                            <option value="대여 중">대여 중</option>
                            <option value="대여 중지">대여 중지</option>
                        </select>
                        <div className="table-container">
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
                                    <th>전시 상태</th>
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
                                            <button className="su" onClick={() => handleEditRoom(room.id)}>
                                                수정
                                            </button>
                                        </td>
                                        <td>{room.roomNumber}</td>
                                        <td>{room.roomName}</td>
                                        <td>{room.rentalPrice} 원</td>
                                        <td>{room.discountPrice} 원</td>
                                        <td>{room.sellerDiscountPrice} 원</td>
                                        <td>{room.exhibitionStatus}</td>
                                        <td>{room.registrationDate}</td>
                                        <td>{room.modificationDate}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <div className="save-container">
                                <button onClick={handleSaveRoomChanges} className="button">수정 항목 저장</button>
                            </div>
                        </div>

                    </div>


        </div>
    );
};

export default SpaceSelect;
