import React, { useState } from 'react';
import styles from "./Select.module.css";

const Searchcomponent = ({ fields = [], onSearch, onReset }) => {
    const [inputValues, setInputValues] = useState({});
    const [checkboxValues, setCheckboxValues] = useState({});

    const handleInputChange = (field, value) => {
        setInputValues((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleCheckboxChange = (field, value, checked) => {
        setCheckboxValues((prev) => ({
            ...prev,
            [field]: checked ? [...(prev[field] || []), value] : (prev[field] || []).filter(item => item !== value),
        }));
    };

    const handleSearch = () => {
        onSearch({ ...inputValues, ...checkboxValues });
    };

    const handleReset = () => {
        setInputValues({});
        setCheckboxValues({});
        onReset && onReset();
    };

    return (
        <div className={styles.search_component}>
            <div className={styles.input_group}>
                <h3>검색어</h3>
                <div className={styles.room_info}>
                    {fields.map((field) => {
                        if (field.type === "text") {
                            return (
                                <div key={field.name} className={styles.input_lable}>
                                    <label>{field.label}</label>
                                    <input
                                        type="text"
                                        value={inputValues[field.name] || ''}
                                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                                    />
                                </div>
                            );
                        } else if (field.type === "checkbox") {
                            return (
                                <div key={field.name} className={styles.checkbox_group}>
                                    <label>{field.label}</label>
                                    <div className={styles.select_box}>
                                        {field.options.map((option) => (
                                            <label key={option.value}>
                                                <input
                                                    type="checkbox"
                                                    value={option.value}
                                                    checked={checkboxValues[field.name]?.includes(option.value) || false}
                                                    onChange={(e) => handleCheckboxChange(field.name, option.value, e.target.checked)}
                                                />
                                                {option.label}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            </div>

            <div className={styles.button_group}>
                <button onClick={handleSearch} className={styles.search_button}>검색</button>
                <button onClick={handleReset} className={styles.reset_button}>초기화</button>
            </div>
        </div>
    );
};

export default Searchcomponent;
