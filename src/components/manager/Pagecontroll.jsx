import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Pagecontroll.module.css";

const Pagecontroll = ({title}) => {
    const navigate = useNavigate();

    return (
        <div className={styles.sidebar}>
            <div className={styles.title}>{title}</div>
            <div className={styles.menu_container}>
                <div className={styles.menu_box} onClick={() => navigate('/admin/UserManager')}>
                    회원 관리
                </div>
                <div className={styles.menu_box} onClick={() => navigate('/admin/RoomManagement')}>
                    방 관리
                </div>
                <div className={styles.menu_box} onClick={() => navigate('/admin/ReservationManagement')}>
                    예약 확인
                </div>
                <div className={styles.menu_box} onClick={() => navigate('/admin/InquiryManagement')}>
                    문의 사항
                </div>
                <div className={styles.menu_box} onClick={() => navigate('/admin/PaymentManagement')}>
                    결제 관리
                </div>
                <div className={styles.menu_box} onClick={() => navigate('/admin/ClubManager')}>
                    동아리 관리
                </div>
                <div className={styles.menu_box} onClick={() => navigate('/admin/BusinessApproval')}>
                    사업자 승인
                </div>
            </div>
        </div>
    );
};

export default Pagecontroll;
