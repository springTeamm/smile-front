import React, { useState } from 'react';
import styles from "./Select.module.css";

const Searchservation = ({ fields, checkboxOptions, onSearch, onReset }) => {
    const [inputValues, setInputValues] = useState({});
    const [checkboxValues, setCheckboxValues] = useState([]);

    const handleInputChange = (field, value) => {
        setInputValues((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleCheckboxChange = (value, checked) => {
        const updatedCheckboxValues = checked
            ? [...checkboxValues, value]
            : checkboxValues.filter(item => item !== value);
        setCheckboxValues(updatedCheckboxValues);
    };

    const handleSearch = () => {
        onSearch({ ...inputValues, selectedOptions: checkboxValues });
    };

    const handleReset = () => {
        setInputValues({});
        setCheckboxValues([]);
        onReset && onReset();  // 초기화 콜백 호출
    };

    return (
        <div className={styles.search_component}>
            <div className={styles.input_group}>
                <h3>검색어</h3>

                <div className={styles.room_info}>
                    {fields.map((field) => (
                        <div key={field.name}>
                            <label>{field.label}</label>
                            <input
                                type="text"
                                value={inputValues[field.name] || ''}
                                onChange={(e) => handleInputChange(field.name, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
                <div className={styles.checkbox_group}>
                    <label>방 상태</label>
                    <div className={styles.select_box}>
                        {checkboxOptions.map((option) => (
                            <label key={option.value}>
                                <input
                                    type="checkbox"
                                    value={option.value}
                                    checked={checkboxValues.includes(option.value)}
                                    onChange={(e) => handleCheckboxChange(option.value, e.target.checked)}
                                />
                                {option.label}
                            </label>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.button_group}>
                <button onClick={handleSearch} className={styles.search_button}>검색</button>
                <button onClick={handleReset} className={styles.reset_button}>초기화</button>
            </div>
        </div>
    );
};

export default Searchservation;
