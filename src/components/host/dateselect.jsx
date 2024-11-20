import React, { useState } from 'react';
import styles from './dateselect.module.css'; 

const Dateselect = ({ text, totalnum }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedRange, setSelectedRange] = useState('');

    const handleRangeClick = (range) => {
        setSelectedRange(range);
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h3>
                    {text}(총 <span className={styles.totaluserHighlight}>{totalnum}</span>개)
                </h3>
            </div>
            <div className={styles.filter_container}>
                기간 :
                <div className={styles.range_buttons}>
                    <button onClick={() => handleRangeClick('today')}>오늘</button>
                    <button onClick={() => handleRangeClick('1week')}>1주</button>
                    <button onClick={() => handleRangeClick('1month')}>1개월</button>
                    <button onClick={() => handleRangeClick('3months')}>3개월</button>
                </div>
                <div className={styles.date_picker}>
                    <input
                        type="date"
                        value={startDate}
                        onChange={handleStartDateChange}
                        placeholder="날짜 선택"
                    />
                    &nbsp;-&nbsp;
                    <input
                        type="date"
                        value={endDate}
                        onChange={handleEndDateChange}
                        placeholder="날짜 선택"
                    />
                </div>
            </div>
        </div>
    );
};

export default Dateselect;
