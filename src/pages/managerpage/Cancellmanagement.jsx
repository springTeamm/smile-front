import React, { useEffect, useState, useCallback } from 'react';
import Select from '../../components/manager/Select';
import Sidebar from "../../components/manager/Sidebar";
import Managertitle from "../../components/manager/managertitle";
import styles from "../managerpagecss/Cancellmanagement.module.css"
import Managericon from "../../components/manager/managericon";
import Dateselect from "../../components/manager/dateselect";

const Cancellmanagement = () => {
    const rooms = [
        { id: 1, roomNumber: '101', roomName: 'A룸', status: '대여 중', modifyDate: '2024-01-01T12:35:00', createDate: '2023-12-01T10:20:00' },
        { id: 2, roomNumber: '102', roomName: 'B룸', status: '대여 중지', modifyDate: '2024-01-02T14:40:00', createDate: '2023-11-20T15:30:00' },
        { id: 3, roomNumber: '103', roomName: 'C룸', status: '승인 대기', modifyDate: '2024-01-03T09:50:00', createDate: '2023-11-15T11:15:00' },
    ];

    const handleSaveRoomChanges = () => {
        // 승인처리 저장 (백엔드 연동 필요)
        alert("수정 항목");

    };
    const [filteredData, setFilteredData] = useState(rooms);


    const handleFilterChange = useCallback((roomName, roomNumber, selectedStatus) => {
        const newFilteredData = rooms.filter(item => {
            const matchRoomName = roomName ? item.roomName.includes(roomName) : true;
            const matchRoomNumber = roomNumber ? item.roomNumber.includes(roomNumber) : true;
            const matchStatus = selectedStatus.length > 0 ? selectedStatus.includes(item.status) : true;
            return matchRoomName && matchRoomNumber && matchStatus;
        });
        setFilteredData(newFilteredData);
    }, [rooms]);
    const totalRooms = filteredData.length;
    const cancellApproval = totalRooms
    const cancellStopped = 1;// 나중에 데이터 베이스 취소완료 건 을 가져오기

    return (

                <div className={styles.allcontain}>
                    <div className={styles.title}> <Managertitle title={"취소 관리"} /></div>
                    <div className={styles.icon}><Managericon totalRooms={totalRooms} waitingApproval={cancellApproval} rentalStopped={cancellStopped}/></div>
                    <div className={styles.search_section}>
                        <Select onFilterChange={handleFilterChange} />
                    </div>
                    <div className={styles.selecttotal}><Dateselect text={"취소 목록"} totalnum={totalRooms}/></div>

                    <div className={styles.table}>
                        <button onClick={handleSaveRoomChanges} className={styles.savebutton}>최초 승인 처리</button>
                        <div className={styles.table_container}>
                            <table>
                                <thead>
                                <tr>
                                    <th>선택</th>
                                    <th>방 번호</th>
                                    <th>방 이름</th>
                                    <th>상태</th>
                                    <th>수정일</th>
                                    <th>등록일</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredData.length > 0 ? (
                                    filteredData.map((item) => (
                                        <tr key={item.id}>
                                            <td><input type="checkbox"/></td>
                                            <td>{item.roomNumber}</td>
                                            <td>{item.roomName}</td>
                                            <td>{item.status}</td>
                                            <td>{item.modifyDate}</td>
                                            <td>{item.createDate}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6">검색 결과가 없습니다.</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>

                        </div>
                    </div>
        </div>
    );
};

export default Cancellmanagement;
