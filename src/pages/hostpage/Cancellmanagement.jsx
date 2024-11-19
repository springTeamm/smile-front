import React, { useState } from 'react';
import Managertitle from "../../components/host/managertitle";
import styles from "../hostpagecss/Cancellmanagement.module.css";
import Managericon from "../../components/host/hostricon";
import Dateselect from "../../components/host/dateselect";
import Selectcomponent from "../../components/host/Selectcomponent";
import roomstyles from "../hostpagecss/Roomstyle.module.css"
const Cancellmanagement = () => {
    const rooms = [
        { id: 1, roomNumber: '101', paymentDate: '2024-01-01', cancellationDate: '2024-01-02', registrationDate: '2023-12-01', roomName: 'A룸' },
        { id: 2, roomNumber: '102', paymentDate: '2024-01-03', cancellationDate: '2024-01-04', registrationDate: '2023-12-02', roomName: 'B룸' },
        { id: 3, roomNumber: '103', paymentDate: '2024-01-05', cancellationDate: '2024-01-06', registrationDate: '2023-12-03', roomName: 'C룸' },
    ];

    const [filteredData, setFilteredData] = useState(rooms);
    const [selectedIds, setSelectedIds] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const searchFields = [
        { name: 'roomName', label: '방 이름', type: 'text' },
        { name: 'roomNumber', label: '방 번호', type: 'text' },
    ];

    const handleFilterChange = (searchData) => {
        const filtered = rooms.filter(item => {
            const matchRoomName = searchData.roomName ? item.roomName.includes(searchData.roomName) : true;
            const matchRoomNumber = searchData.roomNumber ? item.roomNumber.includes(searchData.roomNumber) : true;
            return matchRoomName && matchRoomNumber;
        });
        setFilteredData(filtered);
    };

    const handleCheckboxChange = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter(selectedId => selectedId !== id) : [...prev, id]
        );
    };

    const handleSaveRoomChanges = () => {
        if (selectedIds.length === 0) {
            alert('취소 승인할 항목을 선택하세요.');
            return;
        }
        setIsModalOpen(true);
    };

    const handleModalConfirm = () => {

        setFilteredData(filteredData.filter(item => !selectedIds.includes(item.id)));
        setSelectedIds([]);
        setIsModalOpen(false);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const totalRooms = filteredData.length;

    return (
        <div className={styles.allcontain}>
            <div className={styles.title}> <Managertitle title={"취소 관리"} /></div>
            <div className={styles.icon}>
                <Managericon totalRooms={totalRooms} waitingApproval={totalRooms} rentalStopped={1} />
            </div>
            <div className={styles.search_section}>
                <Selectcomponent fields={searchFields} onSearch={handleFilterChange} />
            </div>
            <div className={styles.selecttotal}><Dateselect text={"취소 목록"} totalnum={totalRooms} /></div>
            <div className={styles.table}>
                <button onClick={handleSaveRoomChanges} className={styles.savebutton}>취소 승인 처리</button>
                <div className={styles.table_container}>
                    <table>
                        <thead>
                        <tr>
                            <th>선택</th>
                            <th>방 번호</th>
                            <th>결제일</th>
                            <th>취소 일시</th>
                            <th>등록일</th>
                            <th>방 이름</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(item.id)}
                                            onChange={() => handleCheckboxChange(item.id)}
                                        />
                                    </td>
                                    <td>{item.roomNumber}</td>
                                    <td>{item.paymentDate}</td>
                                    <td>{item.cancellationDate}</td>
                                    <td>{item.registrationDate}</td>
                                    <td>{item.roomName}</td>
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


            {isModalOpen && (
                <div className={roomstyles.modal}>
                    <div className={roomstyles.modal_content}>
                        <div className={roomstyles.room_table}>

                        <p>선택한 항목을 승인 처리하시겠습니까?</p>
                        </div>
                        <div className={roomstyles.closemodal}>
                            <button onClick={handleModalConfirm} >확인</button>
                            <button onClick={handleModalClose} >취소</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cancellmanagement;
