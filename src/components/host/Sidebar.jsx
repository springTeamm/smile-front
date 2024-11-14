import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Sidebar.css"
const Sidebar = () => {
    const navigate = useNavigate();
    return (
        <div className="sidebar">

            <div className="menu-container">
                <div className="menu-box" onClick={() => navigate('/ManagerPage/SpaceSelect')}>
                    공간 조회/수정
                </div>
                <div className="menu-box" onClick={() => navigate('/ManagerPage/cancellmanagement')}>
                    취소 관리
                </div>
                <div className="menu-box" onClick={() => navigate('/ManagerPage/reservationinfo')}>
                    예약 정보 확인
                </div>
                <div className="menu-box" onClick={() => navigate('/ManagerPage/chat')}>
                    채팅 상담
                </div>
                <div className="menu-box" onClick={() => navigate('/ManagerPage/hostinfo')}>
                    호스트 정보
                </div>
                <div className="menu-box" onClick={() => navigate('/ManagerPage/clubmanagement')}>
                    동아리 관리
                </div>
                <div className="menu-box" onClick={() => navigate('/ManagerPage/review')}>
                    리뷰 관리
                </div>
            </div>
        </div>
    );
};

export default Sidebar;