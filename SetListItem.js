import React from 'react';

const SetListItem = ({ item }) => {
    return (
        <div className="setlist-item">
            <div className="item-image">
                <img src={item.imageUrl} alt={item.title} />
                <button className="favorite-button">♡</button>
            </div>
            <div className="item-info">
                <h3>{item.title}</h3>
                <p className="location">📍 {item.location}</p>
                <p className="datetime">🕒 {item.datetime}</p>
            </div>
            <div className="item-buttons">
                <button className="service-button">서비스 보기</button>
                <button className="personal-button">개인 연습 날짜</button>
                <button className="team-button">팀별 연습 날짜</button>
            </div>
        </div>
    );
};

export default SetListItem;