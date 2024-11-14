
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './dateselect.module.css';
import { FaCalendarAlt } from 'react-icons/fa';

const Dateselect = ({text,totalnum}) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedRange, setSelectedRange] = useState('');
    const [selectedDate, setSelectedDate] = useState(null)
    const handleRangeClick = (range) => {
        setSelectedRange(range);
        console.log(`Selected range: ${range}`);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
        console.log(`Start date selected: ${date}`);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        console.log(`End date selected: ${date}`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>
    <h3>{text}(총 {totalnum}개)</h3></div>
        <div className={styles.filter_container}>
            기간 :
            <div className={styles.range_buttons}>
                <button onClick={() => handleRangeClick('today')}>오늘</button>
                <button onClick={() => handleRangeClick('1week')}>1주</button>
                <button onClick={() => handleRangeClick('1month')}>1개월</button>
                <button onClick={() => handleRangeClick('3months')}>3개월</button>
            </div>

            <div className={styles.date_picker}>

                <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="날짜 선택"

                />

                <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="날짜 선택"

                />
            </div>


        </div>

        </div>
    );
};

export default Dateselect;
