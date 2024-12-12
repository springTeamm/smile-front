import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styles from './setlist.module.css';

const SetlistPersonal = () => {
    const { performanceId, setlistItemId } = useParams();
    const history = useHistory();
    const [personalProgress, setPersonalProgress] = useState({});

    useEffect(() => {
        // 선택한 곡의 개인별 진척도 데이터 가져오기
        fetchPersonalProgress(performanceId, setlistItemId);
    }, [performanceId, setlistItemId]);

    const fetchPersonalProgress = (performanceId, setlistItemId) => {
        // 실제 API에서 데이터를 가져오는 코드 작성
        const data = {
            john: 90,
            jane: 75,
            david: 85,
        };
        setPersonalProgress(data);
    };

    const handleBackNavigation = () => {
        // SetlistDetail 페이지로 이동
        history.push(`/setlist/${performanceId}`);
    };

    return (
        <div className={styles.setlistPersonal}>
            <h1>개인별 진척도</h1>
            <button className={styles.backButton} onClick={handleBackNavigation}>
                뒤로 가기
            </button>
            <div className={styles.progressContainer}>
                {Object.keys(personalProgress).map((member) => (
                    <div key={member} className={styles.progressItem}>
                        <h3>{member}</h3>
                        <div className={styles.progressBar}>
                            <div
                                className={styles.personalProgress}
                                style={{ width: `${personalProgress[member]}%` }}
                            />
                        </div>
                        <span>{personalProgress[member]}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SetlistPersonal;