import React, { useState } from 'react';
import styles from "./UserManager.module.css";
import Pagecontroll from "../../components/manager/Pagecontroll";
import Managericon from "../../components/manager/managericon";
import Selectcomponent from "../../components/host/Selectcomponent";
import Dateselect from "../../components/host/dateselect";

const PaymentManagement = () => {
    // 검색 필드 설정
    const searchFields = [
        {
            name: 'roomNumber',
            label: '고객 명',
            type: 'text',
        },
        {
            name: 'hostName',
            label: '호스트 명',
            type: 'text',
        },
        {
            name: 'userPhone',
            label: '전화번호',
            type: 'text',
        },
        {
            name: 'hostPhone',
            label: '호스트 전화번호',
            type: 'text',
        },

    ];

    // 초기 결제 데이터
    const initialPayments = [
        {
            id: 1,
            roomNumber: "101동",
            hostName: "김이이",
            hostPhone: "010-1111-1111",
            paymentNumber: "2024123456123",
            renterName: "이재혁",
            reservationTime: "11:00-12:00",
            totalReservations: 4,
            renterCount: 3,
            roomName: "연습실A",
            paymentDate: "2024-11-18",
            rentalPrice: 27000,
            discount: "Y",
            claimStatus: "Y"
        },
        {
            id: 2,
            roomNumber: "102동",
            hostName: "박호호",
            hostPhone: "010-2222-2222",
            paymentNumber: "2024123456789",
            renterName: "홍길동",
            reservationTime: "14:00-15:00",
            totalReservations: 6,
            renterCount: 2,
            roomName: "연습실B",
            paymentDate: "2024-11-19",
            rentalPrice: 32000,
            discount: "N",
            claimStatus: "N"
        }
    ];

    const [payments, setPayments] = useState(initialPayments);
    const totalPayments = payments.length;

    const handleSearch = (searchData) => {
        const filteredPayments = initialPayments.filter(payment =>
            (searchData.roomNumber ? payment.roomNumber.includes(searchData.roomNumber) : true) &&
            (searchData.hostName ? payment.hostName.includes(searchData.hostName) : true) &&
            (searchData.hostPhone ? payment.hostPhone.includes(searchData.hostPhone) : true) &&
            (searchData.paymentNumber ? payment.paymentNumber.includes(searchData.paymentNumber) : true) &&
            (searchData.renterName ? payment.renterName.includes(searchData.renterName) : true) &&
            (searchData.reservationTime ? payment.reservationTime.includes(searchData.reservationTime) : true)
        );
        setPayments(filteredPayments);
    };

    const handleReset = () => {
        setPayments(initialPayments);
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}><Pagecontroll title="결제 관리"/></div>

            <div className={styles.search_section}>
                <Selectcomponent
                    fields={searchFields}
                    onSearch={handleSearch}
                    onReset={handleReset}
                />
            </div>
            <div className={styles.title}>
                <Dateselect text={"목록"} totalnum={totalPayments}/>
            </div>
            <div className={styles.titledetail}><h3>결제 목록</h3></div>
            <div className={styles.table}>
                <div className={styles.table_container}>
                    <table>
                        <thead>
                        <tr>
                            <th>선택</th>
                            <th>방 번호</th>
                            <th>호스트 명</th>
                            <th>호스트 전화번호</th>
                            <th>결제 번호</th>
                            <th>대여자 명</th>
                            <th>예약 시간</th>
                            <th>누적 예약 횟수</th>
                            <th>예약자 수</th>
                            <th>방 이름</th>
                            <th>결제 일시</th>
                            <th>대여 가격</th>
                            <th>할인가</th>
                            <th>클레임 상태</th>
                        </tr>
                        </thead>
                        <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment.id}>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>{payment.roomNumber}</td>
                                <td>{payment.hostName}</td>
                                <td>{payment.hostPhone}</td>
                                <td>{payment.paymentNumber}</td>
                                <td>{payment.renterName}</td>
                                <td>{payment.reservationTime}</td>
                                <td>{payment.totalReservations}</td>
                                <td>{payment.renterCount}</td>
                                <td>{payment.roomName}</td>
                                <td>{payment.paymentDate}</td>
                                <td>{payment.rentalPrice}</td>
                                <td>{payment.discount === "Y" ? "할인 적용" : "미적용"}</td>
                                <td>{payment.claimStatus === "Y" ? "클레임 있음" : "없음"}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentManagement;
