import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Sidebar.css"
const Sidebar = () => {
    const navigate = useNavigate();
    return (
        <div className="sidebar">

            <div className="menu-container">
                <div className="menu-box" onClick={() => navigate('/HostPage/SpaceSelect')}>
                    공간 조회/수정
                </div>
                <div className="menu-box" onClick={() => navigate('/HostPage/cancellmanagement')}>
                    취소 관리
                </div>
                <div className="menu-box" onClick={() => navigate('/HostPage/Reservationinfo')}>
                    예약 정보 확인
                </div>
                <div className="menu-box" onClick={() => navigate('/HostPage/Chat')}>
                    채팅 상담
                </div>
                <div className="menu-box" onClick={() => navigate('/HostPage/Hostinfo')}>
                    호스트 정보
                </div>
                <div className="menu-box" onClick={() => navigate('/HostPage/Clubmanagement')}>
                    동아리 관리
                </div>
                <div className="menu-box" onClick={() => navigate('/HostPage/Review')}>
                    리뷰 관리
                </div>
                <div className="menu-box" onClick={() => navigate('/HostPage/Moneymanager')}>
                    매출관리
                </div>
            </div>
        </div>
    );
};

export default Sidebar;