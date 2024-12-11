import React from 'react';

import '../styles/Header.css';

function Header() {
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
        <a href="/login" className="header__link">로그인</a>
        <span className="header__separator">|</span>
        <a href="/signup" className="header__link">회원가입</a>
      </div>
    </header>
  );
}

export default Header;