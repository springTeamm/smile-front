import React, { useState, useEffect } from 'react';

import '../styles/Header.css';

function Header() {

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
        // 로그아웃 시 localStorage에서 사용자 정보 제거
        localStorage.removeItem('UserInfo');
        setIsLoggedIn(false); // 로그인 상태 false로 설정
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
                        <a href="/logout" className="header__link">로그아웃</a>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;