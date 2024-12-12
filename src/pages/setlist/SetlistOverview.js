import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './setlist.module.css';

const SetlistOverview = () => {
    const history = useHistory();

    // 공연 정보 데이터
    const performanceData = [
        { id: 1, name: '공연 A', date: '2023-05-01' },
        { id: 2, name: '공연 B', date: '2023-06-15' },
        { id: 3, name: '공연 C', date: '2023-07-20' },
    ];

    const handlePerformanceClick = (performanceId) => {
        // 클릭한 공연의 ID를 이용하여 SetlistDetail 페이지로 이동
        history.push(`/setlist/${performanceId}`);
    };

    return (
        <div className={styles.setlistOverview}>
            <h1>공연 목록</h1>
            <ul>
                {performanceData.map((performance) => (
                    <li key={performance.id} onClick={() => handlePerformanceClick(performance.id)}>
                        <h2>{performance.name}</h2>
                        <p>날짜: {performance.date}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SetlistOverview;