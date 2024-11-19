
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

    };

    const handleStartDateChange = (date) => {
        setStartDate(date);

    };

    const handleEndDateChange = (date) => {
        setEndDate(date);

    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>
    <h3>{text}(총 <span className={styles.totaluserHighlight}>{totalnum}</span>개)</h3></div>
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
- &nbsp;

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
