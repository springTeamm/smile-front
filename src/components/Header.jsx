import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
    const navigate = useNavigate();

    // 로그인 상태를 관리하는 state
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // 컴포넌트가 렌더링 될 때 localStorage에서 로그인 상태를 확인
        const userInfo = localStorage.getItem('UserInfo');
        if (userInfo) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        try {
            localStorage.removeItem('UserInfo');
            setIsLoggedIn(false);
            navigate('/login');  // 로그인 페이지로 리다이렉트
        } catch (error) {
            console.error('로그아웃 중 오류 발생:', error);
        }
    };



    return (
        <header className="header">
            <div className="header__left">
                <a href = "/">weroom</a>
            </div>

            <nav className="header__center">
                <a href="/search" className="header__link">방 찾기</a>
                <a href="/board-performance" className="header__link">커뮤니티</a>
                <a href="/list" className="header__link">셋 리스트</a>
                <a href="/HostPage" className="header__link">호스트</a>

            </nav>

            <div className="header__right">
                {!isLoggedIn ? (
                    <>
                        <a href="/login" className="header__link">로그인</a>
                        <span className="header__separator">|</span>
                        <a href="/signup" className="header__link">회원가입</a>
                    </>
                ) : (
                    <>
                        <a href="/profile" className="header__link">마이 페이지</a>
                        <span className="header__separator">|</span>
                        <button onClick={handleLogout} className="header__link">로그아웃</button>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;