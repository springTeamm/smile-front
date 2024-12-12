import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styles from './setlist.module.css';

const SetlistDetail = () => {
    const { performanceId } = useParams();
    const history = useHistory();
    const [setlistData, setSetlistData] = useState([]);

    useEffect(() => {
        // 선택한 공연의 세팅 리스트 데이터 가져오기
        fetchSetlistData(performanceId);
    }, [performanceId]);

    const fetchSetlistData = (id) => {
        // 실제 API에서 데이터를 가져오는 코드 작성
        const data = [
            { id: 1, title: '곡 A', teamProgress: 80, personalProgress: { john: 90, jane: 75, david: 85 } },
            { id: 2, title: '곡 B', teamProgress: 60, personalProgress: { john: 70, jane: 55, david: 65 } },
            { id: 3, title: '곡 C', teamProgress: 90, personalProgress: { john: 95, jane: 85, david: 90 } },
        ];
        setSetlistData(data);
    };

    const handleSetlistItemClick = (setlistItem) => {
        // 클릭한 곡의 정보를 이용하여 SetlistPersonal 페이지로 이동
        history.push(`/setlist/${performanceId}/personal/${setlistItem.id}`);
    };

    return (
        <div className={styles.setlistDetail}>
            <h1>세팅 리스트</h1>
            <ul>
                {setlistData.map((item) => (
                    <li key={item.id} onClick={() => handleSetlistItemClick(item)}>
                        <h2>{item.title}</h2>
                        <div className={styles.progressBar}>
                            <div className={styles.teamProgress} style={{ width: `${item.teamProgress}%` }} />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SetlistDetail;