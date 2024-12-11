import React, { useState } from 'react';
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
import MessageButton from '../../components/chattingbox/component/MessageButton';

const MainPage = () => {
  const navigate = useNavigate();
  const [region, setRegion] = useState('');
  const [spaceType, setSpaceType] = useState('');

  // Handle region selection
  const handleRegionSelect = (regionName) => {
    setRegion(regionName);
    navigate(`/search?region=${regionName}&spaceType=${spaceType}`);
  };

  // Handle space type selection
  const handleSpaceSelect = (space) => {
    setSpaceType(space);
    navigate(`/search?region=${region}&spaceType=${space}`);
  };

  return (
      <div className={styles.mainContainer}>
        <main className={styles.mainContent}>
          {/* Region Section */}
          <section className={styles.categorySection}>
            <h3>장소 별 &nbsp;&nbsp;&nbsp;〉</h3>
            <div className={styles.regionList}>
              <div className={styles.categoryItemContainer}>
                <button onClick={() => handleRegionSelect('서울')} className={styles.regionItem}>
                  <img src={seoulIcon} alt="서울 아이콘" />
                </button>
                <p className={styles.categoryText}>서울</p>
              </div>
              <div className={styles.categoryItemContainer}>
                <button onClick={() => handleRegionSelect('경기')} className={styles.regionItem}>
                  <img src={gyeonggiIcon} alt="경기 아이콘" />
                </button>
                <p className={styles.categoryText}>경기</p>
              </div>
              <div className={styles.categoryItemContainer}>
                <button onClick={() => handleRegionSelect('인천')} className={styles.regionItem}>
                  <img src={incheonIcon} alt="인천 아이콘" />
                </button>
                <p className={styles.categoryText}>인천</p>
              </div>
              <div className={styles.categoryItemContainer}>
                <button onClick={() => handleRegionSelect('부산')} className={styles.regionItem}>
                  <img src={busanIcon} alt="부산 아이콘" />
                </button>
                <p className={styles.categoryText}>부산</p>
              </div>
              <div className={styles.categoryItemContainer}>
                <button onClick={() => handleRegionSelect('강원')} className={styles.regionItem}>
                  <img src={gangwonIcon} alt="강원 아이콘" />
                </button>
                <p className={styles.categoryText}>강원</p>
              </div>
              <div className={styles.categoryItemContainer}>
                <button onClick={() => handleRegionSelect('충청')} className={styles.regionItem}>
                  <img src={ChungcheongIcon} alt="충청 아이콘" />
                </button>
                <p className={styles.categoryText}>충청</p>
              </div>
              <div className={styles.categoryItemContainer}>
                <button onClick={() => handleRegionSelect('전라')} className={styles.regionItem}>
                  <img src={jeollaIcon} alt="전라 아이콘" />
                </button>
                <p className={styles.categoryText}>전라</p>
              </div>
              <div className={styles.categoryItemContainer}>
                <button onClick={() => handleRegionSelect('경상')} className={styles.regionItem}>
                  <img src={gyeongsangIcon} alt="경상 아이콘" />
                </button>
                <p className={styles.categoryText}>경상</p>
              </div>
              <div className={styles.categoryItemContainer}>
                <button onClick={() => handleRegionSelect('제주')} className={styles.regionItem}>
                  <img src={jejuIcon} alt="제주 아이콘" />
                </button>
                <p className={styles.categoryText}>제주</p>
              </div>
            </div>
          </section>

          {/* Space Type Section */}
          <section className={styles.categorySection}>
            <h3>공간 별 &nbsp;&nbsp;&nbsp;〉</h3>
            <div className={styles.categoryList}>
              <div className={styles.categoryItemContainer}>
                <button onClick={() => handleSpaceSelect('1')} className={styles.categoryItem}>
                  <img src={musicIcon} alt="음악 아이콘" />
                </button>
                <p className={styles.categoryText}>연습실</p>
              </div>
              <div className={styles.categoryItemContainer}>
                <button onClick={() => handleSpaceSelect('2')} className={styles.categoryItem}>
                  <img src={musicIcon} alt="밴드 아이콘" />
                </button>
                <p className={styles.categoryText}>밴드 연습실</p>
              </div>
              <div className={styles.categoryItemContainer}>
                <button onClick={() => handleSpaceSelect('3')} className={styles.categoryItem}>
                  <img src={musicIcon} alt="댄스 아이콘" />
                </button>
                <p className={styles.categoryText}>댄스 연습실</p>
              </div>
              <div className={styles.categoryItemContainer}>
                <button onClick={() => handleSpaceSelect('4')} className={styles.categoryItem}>
                  <img src={musicIcon} alt="악기 아이콘" />
                </button>
                <p className={styles.categoryText}>악기 연습실</p>
              </div>
            </div>
          </section>
        </main>
      </div>
  );
};

export default MainPage;
import React, { useState } from 'react';
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

const MainPage = () => {
  const navigate = useNavigate();
  const [region, setRegion] = useState('');
  const [spaceType, setSpaceType] = useState('');

  // Handle region selection
  const handleRegionSelect = (regionName) => {
    setRegion(regionName);
    navigate(`/search?region=${regionName}&spaceType=${spaceType}`);
  };

  // Handle space type selection
  const handleSpaceSelect = (space) => {
    setSpaceType(space);
    navigate(`/search?region=${region}&spaceType=${space}`);
  };

  return (
      <div className={styles.mainContainer}>
        <main className={styles.mainContent}>
          {/* Region Section */}
          <section className={styles.categorySection}>
            <h3>장소 별 &nbsp;&nbsp;&nbsp;〉</h3>
            <div className={styles.regionList}>
              <div className={styles.categoryItemContainer}>
                <button onClick={() => handleRegionSelect('서울')} className={styles.regionItem}>
                  <img src={seoulIcon} alt="서울 아이콘" />
                </button>
                <p className={styles.categoryText}>서울</p>
              </div>
              <div className={styles.categoryItemContainer}>
                <button onClick={() => handleRegionSelect('경기')} className={styles.regionItem}>
                  <img src={gyeonggiIcon} alt="경기 아이콘" />
                </button>
                <p className={styles.categoryText}>경기</p>
              </div>
              <div className={styles.categoryItemContainer}>
                <button onClick={() => handleRegionSelect('인천')} className={styles.regionItem}>
                  <img src={incheonIcon} alt="인천 아이콘" />
                </button>
                <p className={styles.categoryText}>인천</p>
              </div>
              <div className={styles.categoryItemContainer}>
                <button onClick={() => handleRegionSelect('부산')} className={styles.regionItem}>
                  <img src={busanIcon} alt="부산 아이콘" />
                </button>
                <p className={styles.categoryText}>부산</p>
              </div>
              <div className={styles.categoryItemContainer}>
                <button onClick={() => handleRegionSelect('강원')} className={styles.regionItem}>
                  <img src={gangwonIcon} alt="강원 아이콘" />
                </button>
                <p className={styles.categoryText}>강원</p>
              </div>
              <div className={styles.categoryItemContainer}>
                <button onClick={() => handleRegionSelect('충청')} className={styles.regionItem}>
                  <img src={ChungcheongIcon} alt="충청 아이콘" />
                </button>
                <p className={styles.categoryText}>충청</p>
              </div>
              <div className={styles.categoryItemContainer}>
                <button onClick={() => handleRegionSelect('전라')} className={styles.regionItem}>
                  <img src={jeollaIcon} alt="전라 아이콘" />
                </button>
                <p className={styles.categoryText}>전라</p>
              </div>
              <div className={styles.categoryItemContainer}>
                <button onClick={() => handleRegionSelect('경상')} className={styles.regionItem}>
                  <img src={gyeongsangIcon} alt="경상 아이콘" />
                </button>
                <p className={styles.categoryText}>경상</p>
              </div>
              <div className={styles.categoryItemContainer}>
                <button onClick={() => handleRegionSelect('제주')} className={styles.regionItem}>
                  <img src={jejuIcon} alt="제주 아이콘" />
                </button>
                <p className={styles.categoryText}>제주</p>
              </div>
            </div>
          </section>

          {/* Space Type Section */}
          <section className={styles.categorySection}>
            <h3>공간 별 &nbsp;&nbsp;&nbsp;〉</h3>
            <div className={styles.categoryList}>
              <div className={styles.categoryItemContainer}>
                <button onClick={() => handleSpaceSelect('1')} className={styles.categoryItem}>
                  <img src={musicIcon} alt="음악 아이콘" />
                </button>
                <p className={styles.categoryText}>연습실</p>
              </div>
              <div className={styles.categoryItemContainer}>
                <button onClick={() => handleSpaceSelect('2')} className={styles.categoryItem}>
                  <img src={musicIcon} alt="밴드 아이콘" />
                </button>
                <p className={styles.categoryText}>밴드 연습실</p>
              </div>
              <div className={styles.categoryItemContainer}>
                <button onClick={() => handleSpaceSelect('3')} className={styles.categoryItem}>
                  <img src={musicIcon} alt="댄스 아이콘" />
                </button>
                <p className={styles.categoryText}>댄스 연습실</p>
              </div>
              <div className={styles.categoryItemContainer}>
                <button onClick={() => handleSpaceSelect('4')} className={styles.categoryItem}>
                  <img src={musicIcon} alt="악기 아이콘" />
                </button>
                <p className={styles.categoryText}>악기 연습실</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <MessageButton>

      </MessageButton>
    </div>
  );
};

export default MainPage;
