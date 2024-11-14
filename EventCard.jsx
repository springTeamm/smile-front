import React from 'react';

const EventCard = ({ title, date, location }) => {
    return (
        <div className="event-card">
            <img src="placeholder.jpg" alt="이벤트 이미지" />
            <h3>{title}</h3>
            <p>{date}</p>
            <p>{location}</p>
            <button>셋리스트 보기</button>
        </div>
    );
};

export default EventCard;