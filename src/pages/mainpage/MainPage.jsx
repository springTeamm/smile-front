import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import musicIcon from './images/music.png';
import seoulIcon from './images/서울.png';
import gyeonggiIcon from './images/경기도.png';
import incheonIcon from './images/인천.png';
import busanIcon from './images/부산.png';
import gangwonIcon from './images/강원.png';
import jeollaIcon from './images/전라도.png';
import ChungcheongIcon from './images/충청.png';
import jejuIcon from './images/제주.png';
import gyeongsangIcon from './images/경상.png';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <header className="header-section">
        <div className="image-placeholder">이미지</div>
      </header>

      <main className="main-content">
        <section className="category-section">
          <button 
            className="section-heading-button" 
            onClick={() => navigate('/spaces')}
          >
            <h3>공간 별 &nbsp;&nbsp;&nbsp;〉</h3>
          </button>
          <div className="category-list">
            <div className="category-item-container">
              <button onClick={() => navigate('/page1')} className="category-item">
                <img src={musicIcon} alt="음악 아이콘" className="category-icon" />
              </button>
              <p className="category-text">연습실</p>
            </div>
            <div className="category-item-container">
              <button onClick={() => navigate('/page2')} className="category-item">
                <img src={musicIcon} alt="음악 아이콘" className="category-icon" />
              </button>
              <p className="category-text">밴드 연습실</p>
            </div>
            <div className="category-item-container">
              <button onClick={() => navigate('/page2')} className="category-item">
                <img src={musicIcon} alt="음악 아이콘" className="category-icon" />
              </button>
              <p className="category-text">댄스 연습실</p>
            </div>
            <div className="category-item-container">
              <button onClick={() => navigate('/page2')} className="category-item">
                <img src={musicIcon} alt="음악 아이콘" className="category-icon" />
              </button>
              <p className="category-text">악기 연습실</p>
            </div>
          </div>
        </section>

        <section className="category-section">
          <button 
            className="section-heading-button" 
            onClick={() => navigate('/locations')}
          >
            <h3>장소 별 &nbsp;&nbsp;&nbsp;〉</h3>
          </button>
          <div className="region-list">
            <div className="category-item-container">
              <button onClick={() => navigate('/page2')} className="region-item">
                <img src={seoulIcon} alt="서울 아이콘" />
              </button>
              <p className="category-text">서울</p>
            </div>
            <div className="category-item-container">
              <button onClick={() => navigate('/page2')} className="region-item">
                <img src={gyeonggiIcon} alt="경기" />
              </button>
              <p className="category-text">경기</p>
            </div>
            <div className="category-item-container">
              <button onClick={() => navigate('/page2')} className="region-item">
                <img src={incheonIcon} alt="인천" />
              </button>
              <p className="category-text">인천</p>
            </div>
            <div className="category-item-container">
              <button onClick={() => navigate('/page2')} className="region-item">
                <img src={busanIcon} alt="부산" />
              </button>
              <p className="category-text">부산</p>
            </div>
            <div className="category-item-container">
              <button onClick={() => navigate('/page2')} className="region-item">
                <img src={gangwonIcon} alt="강원" />
              </button>
              <p className="category-text">강원</p>
            </div>
            <div className="category-item-container">
              <button onClick={() => navigate('/page2')} className="region-item">
                <img src={ChungcheongIcon} alt="충청" />
              </button>
              <p className="category-text">충청</p>
            </div>
            <div className="category-item-container">
              <button onClick={() => navigate('/page2')} className="region-item">
                <img src={jeollaIcon} alt="전라" />
              </button>
              <p className="category-text">전라</p>
            </div>
            <div className="category-item-container">
              <button onClick={() => navigate('/page2')} className="region-item">
                <img src={gyeongsangIcon} alt="경상" />
              </button>
              <p className="category-text">경상</p>
            </div>
            <div className="category-item-container">
              <button onClick={() => navigate('/page2')} className="region-item">
                <img src={jejuIcon} alt="제주" />
              </button>
              <p className="category-text">제주</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MainPage;
