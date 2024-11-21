import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/MainPage.module.css';
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
import MessageButton from '../../components/MessageButton';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.mainContainer}>
      <header className={styles.headerSection}>
        <div className={styles.imagePlaceholder}>이미지</div>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.categorySection}>
          <button 
            className={styles.sectionHeadingButton} 
            onClick={() => navigate('/spaces')}
          >
            <h3>공간 별 &nbsp;&nbsp;&nbsp;〉</h3>
          </button>
          <div className={styles.categoryList}>
            <div className={styles.categoryItemContainer}>
              <button onClick={() => navigate('/page1')} className={styles.categoryItem}>
                <img src={musicIcon} alt="음악 아이콘" className={styles.categoryIcon} />
              </button>
              <p className={styles.categoryText}>연습실</p>
            </div>
            <div className={styles.categoryItemContainer}>
              <button onClick={() => navigate('/page2')} className={styles.categoryItem}>
                <img src={musicIcon} alt="음악 아이콘" className={styles.categoryIcon} />
              </button>
              <p className={styles.categoryText}>밴드 연습실</p>
            </div>
            <div className={styles.categoryItemContainer}>
              <button onClick={() => navigate('/page3')} className={styles.categoryItem}>
                <img src={musicIcon} alt="음악 아이콘" className={styles.categoryIcon} />
              </button>
              <p className={styles.categoryText}>댄스 연습실</p>
            </div>
            <div className={styles.categoryItemContainer}>
              <button onClick={() => navigate('/page4')} className={styles.categoryItem}>
                <img src={musicIcon} alt="음악 아이콘" className={styles.categoryIcon} />
              </button>
              <p className={styles.categoryText}>악기 연습실</p>
            </div>
          </div>
        </section>

        <section className={styles.categorySection}>
          <button 
            className={styles.sectionHeadingButton} 
            onClick={() => navigate('/locations')}
          >
            <h3>장소 별 &nbsp;&nbsp;&nbsp;〉</h3>
          </button>
          <div className={styles.regionList}>
            <div className={styles.categoryItemContainer}>
              <button onClick={() => navigate('/seoul')} className={styles.regionItem}>
                <img src={seoulIcon} alt="서울 아이콘" />
              </button>
              <p className={styles.categoryText}>서울</p>
            </div>
            <div className={styles.categoryItemContainer}>
              <button onClick={() => navigate('/gyeonggi')} className={styles.regionItem}>
                <img src={gyeonggiIcon} alt="경기 아이콘" />
              </button>
              <p className={styles.categoryText}>경기</p>
            </div>
            <div className={styles.categoryItemContainer}>
              <button onClick={() => navigate('/incheon')} className={styles.regionItem}>
                <img src={incheonIcon} alt="인천 아이콘" />
              </button>
              <p className={styles.categoryText}>인천</p>
            </div>
            <div className={styles.categoryItemContainer}>
              <button onClick={() => navigate('/busan')} className={styles.regionItem}>
                <img src={busanIcon} alt="부산 아이콘" />
              </button>
              <p className={styles.categoryText}>부산</p>
            </div>
            <div className={styles.categoryItemContainer}>
              <button onClick={() => navigate('/gangwon')} className={styles.regionItem}>
                <img src={gangwonIcon} alt="강원 아이콘" />
              </button>
              <p className={styles.categoryText}>강원</p>
            </div>
            <div className={styles.categoryItemContainer}>
              <button onClick={() => navigate('/chungcheong')} className={styles.regionItem}>
                <img src={ChungcheongIcon} alt="충청 아이콘" />
              </button>
              <p className={styles.categoryText}>충청</p>
            </div>
            <div className={styles.categoryItemContainer}>
              <button onClick={() => navigate('/jeolla')} className={styles.regionItem}>
                <img src={jeollaIcon} alt="전라 아이콘" />
              </button>
              <p className={styles.categoryText}>전라</p>
            </div>
            <div className={styles.categoryItemContainer}>
              <button onClick={() => navigate('/gyeongsang')} className={styles.regionItem}>
                <img src={gyeongsangIcon} alt="경상 아이콘" />
              </button>
              <p className={styles.categoryText}>경상</p>
            </div>
            <div className={styles.categoryItemContainer}>
              <button onClick={() => navigate('/jeju')} className={styles.regionItem}>
                <img src={jejuIcon} alt="제주 아이콘" />
              </button>
              <p className={styles.categoryText}>제주</p>
            </div>
          </div>
        </section>
      </main>
      <MessageButton></MessageButton>
    </div>
  );
};

export default MainPage;
