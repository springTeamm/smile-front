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
    }, []);

    const handleSearch = (searchData) => {
        const { locationName, prName } = searchData;
        let filtered = [...rooms];

        if (locationName) {
            filtered = filtered.filter((room) =>
                room.locationName.toLowerCase().includes(locationName.toLowerCase())
            );
        }

        if (prName) {
            filtered = filtered.filter((room) =>
                room.prName.toString().includes(prName)
            );
        }

        setFilteredData(filtered); // 필터링된 결과 업데이트
    };

    const handleReset = () => {
        setFilteredData(rooms); // 초기 목록으로 복원
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

    const handleModalConfirm = async () => {
        try {
            await axios.post('/api/cancellations/approve', { ids: selectedIds });
            const updatedRooms = filteredData.map(item =>
                selectedIds.includes(item.payNum)
                    ? { ...item, bookingCancel: '취소 승인' }
                    : item
            );
            setFilteredData(updatedRooms); // 업데이트된 데이터 반영
            setSelectedIds([]); // 선택 초기화
            setIsModalOpen(false); // 모달 닫기
        } catch (error) {
            console.error('Error approving cancellations:', error);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleDateFilter = (startDate, endDate) => {
        if (startDate && endDate) {
            const filtered = rooms.filter((room) => {
                const payDate = new Date(room.payDate);
                return payDate >= new Date(startDate) && payDate <= new Date(endDate);
            });
            setFilteredData(filtered);
        } else {
            setFilteredData(rooms); // 입력이 없으면 전체 데이터
        }
    };

    const totalRooms = filteredData.length;
    const pendingCancellations = filteredData.filter(room => room.bookingCancel === '취소 대기').length;

    return (
        <div className={styles.allcontain}>
            <div className={styles.title}> <Managertitle title={"취소 관리"} /></div>
            <div className={styles.icon}>
                <Managericon
                    totalRooms={totalRooms}
                    waitingApproval={totalRooms - pendingCancellations}
                    rentalStopped={pendingCancellations}
                    labels={{
                        total: "전체",
                        waiting: "취소 승인 대기",
                        available: "취소 승인 완료",
                    }}
                />
            </div>
            <div className={styles.search_section}>
                <Selectcomponent
                    fields={[
                        { name: "locationName", label: "방 이름", type: "text" },
                        { name: "prName", label: "방 번호", type: "text" },
                    ]}
                    onSearch={handleSearch}
                    onReset={handleReset}
                />
            </div>
            <div className={styles.selecttotal}>
                <Dateselect text={"취소 목록"} totalnum={totalRooms} onDateFilter={handleDateFilter} />
            </div>
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
