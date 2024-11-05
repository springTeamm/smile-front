import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="container">
      <div className="content">
        {/* Main content goes here */}
      </div>
      <footer className="footer">
        <div className="footer-links">
          <a href="#terms">이용약관</a>
          <a href="#financial-terms">전자금융거래 이용약관</a>
          <a href="#privacy-policy">개인정보 처리방침</a>
          <a href="#customer-service">고객센터</a>
          <a href="#safety-guide">안전예약가이드</a>
        </div>
        <div className="footer-disclaimer">
          ???은 통신판매중개자이며, 통신판매의 당사자가 아닙니다.<br />
          객실, 객실정보, 거래에 관한 의무와 책임은 호스트에게 있습니다.
        </div>
        <div className="footer-copyright">
          Copyright © ??????. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
