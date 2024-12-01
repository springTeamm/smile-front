import React, { useState, useEffect } from 'react';
import Managertitle from "../../components/host/managertitle";
import styles from "../hostpagecss/Cancellmanagement.module.css";
import Managericon from "../../components/host/hostricon";
import Dateselect from "../../components/host/dateselect";
import Selectcomponent from "../../components/host/Selectcomponent";
import roomstyles from "../hostpagecss/Roomstyle.module.css";
import axios from 'axios';

const Cancellmanagement = () => {
    const [rooms, setRooms] = useState([]); // 전체 데이터
    const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터
    const [selectedIds, setSelectedIds] = useState([]); // 선택된 항목 ID
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 검색 필드 정의
    const searchFields = [
        { name: 'roomName', label: '방 이름', type: 'text' },
        { name: 'roomNumber', label: '방 번호', type: 'text' },
    ];


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/hostpage/cancell/list'); // 백엔드에서 데이터 가져오기
                setRooms(response.data); // 전체 데이터를 상태로 설정
                setFilteredData(response.data); // 초기 필터링 데이터 설정
            } catch (error) {
                console.error('Error fetching cancellation data:', error);
            }
        };
        fetchData();
    }, [filteredData]);

    // 검색 필터 처리
    const handleFilterChange = (searchData) => {
        const filtered = rooms.filter(item => {
            const matchRoomName = searchData.roomName ? item.roomName.includes(searchData.roomName) : true;
            const matchRoomNumber = searchData.roomNumber ? item.roomNumber.includes(searchData.roomNumber) : true;
            return matchRoomName && matchRoomNumber;
        });
        setFilteredData(filtered);
    };

    // 체크박스 선택 처리
    const handleCheckboxChange = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter(selectedId => selectedId !== id) : [...prev, id]
        );
    };

    // 취소 승인 버튼 클릭 처리
    const handleSaveRoomChanges = () => {
        if (selectedIds.length === 0) {
            alert('취소 승인할 항목을 선택하세요.');
            return;
        }
        setIsModalOpen(true);
    };

    // 모달에서 승인 확인 처리
    const handleModalConfirm = async () => {
        try {
            await axios.post('/api/cancellations/approve', { ids: selectedIds }); // API 호출로 승인 처리
            setFilteredData(filteredData.filter(item => !selectedIds.includes(item.id))); // 필터링된 데이터 업데이트
            setSelectedIds([]); // 선택 초기화
            setIsModalOpen(false); // 모달 닫기
        } catch (error) {
            console.error('Error approving cancellations:', error);
        }
    };

    // 모달 닫기
    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    // 총 방 개수
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
                            <th>결제 번호</th>
                            <th>취소 일시</th>
                            <th>결제 일시</th>
                            <th>방 이름</th>
                            <th>대여 가격</th>
                            <th>대여자명</th>
                            <th>대여 시간</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item) => (
                                <tr key={item.payNum}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(item.payNum)}
                                            onChange={() => handleCheckboxChange(item.payNum)}
                                        />
                                    </td>

                                    <td>{item.prName}</td>
                                    <td>{item.payNum}</td>
                                    <td>{item.bookingCancel ? item.bookingCancel : '취소되지 않음'}</td>
                                    <td>{item.payDate}</td>
                                    <td>{item.locationName}</td>
                                    <td>{item.payPrice}</td>
                                    <td>{item.userName}</td>
                                    <td>{item.bookingDate}</td>
                                    <td>{item.refundDate}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9">검색 결과가 없습니다.</td>
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
                            <button onClick={handleModalConfirm}>확인</button>
                            <button onClick={handleModalClose}>취소</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cancellmanagement;
