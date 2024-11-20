import React from 'react';
import styles from '../../styles/Card.module.css';

function Card() {
    const cards = [
      {
        title: '연습실 A',
        description: '쾌적한 연습실',
        price: '12,000원/시간',
      },
      {
        title: '연습실 B',
        description: '넓은 공간과 좋은 시설',
        price: '15,000원/시간',
      },
      {
        title: '연습실 C',
        description: '합리적인 가격dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd의 연습실',
        price: '10,000원/시간',
      },
      
    ];
  
    return (
      <div className={styles.spaceCardList}>
        {cards.map((card, index) => (
          <div key={index} className={styles.spaceCard}>
            <div className={styles.cardImagePlaceholder}></div>
            <div className={styles.cardContent}>
              <div className={styles.cardTitle}>{card.title}</div>
              <div className={styles.cardDescription}>{card.description}</div>
              <div className={styles.cardPrice}>{card.price}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
export default Card;
