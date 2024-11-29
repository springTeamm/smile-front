import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/Card.module.css';

function Card({ prDetails }) {
  const navigate = useNavigate();

  // locationName이 없거나 중복된 데이터를 필터링
  const uniqueLocationPrDetails = prDetails.reduce((acc, current) => {
    if (
      current.locationName && 
      current.locationName.trim() !== '' && // locationName이 없는 데이터를 제외
      !acc.some(detail => detail.locationName === current.locationName) // locationName이 중복된 데이터를 제외
    ) {
      acc.push(current);
    }
    return acc;
  }, []);

  const handleCardClick = (detail) => {
    // 동적 라우팅으로 /booking/:id로 이동하며 데이터 전달
    navigate(`/booking/${detail.prNum}`, {
      state: { 
        hostNum: detail.hostNum,
        locationName: detail.locationName,
        prName: detail.prName,
      },
    });
  };

  return (
    <div className={styles.spaceCardList}>
      {uniqueLocationPrDetails.length > 0 ? (
        uniqueLocationPrDetails.map((detail, index) => (
          <div
            key={index}
            className={styles.spaceCard}
            onClick={() => handleCardClick(detail)}
            style={{ cursor: 'pointer' }}
          >
            <div className={styles.cardImagePlaceholder}></div>
            <div className={styles.cardContent}>
              <div className={styles.cardTitle}>
                {detail.locationName || '장소명 없음'}
              </div>
              <div className={styles.cardAddress}>
                {detail.prAddress}
              </div>
              <div className={styles.cardDescription}>
                {detail.prWarnings}
              </div>
              <div className={styles.cardPrice}>
                {detail.prPrice.toLocaleString()}원/시간
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>데이터가 없습니다.</p>
      )}
    </div>
  );
}

export default Card;
