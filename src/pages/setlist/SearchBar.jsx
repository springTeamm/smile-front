import React, { useState } from 'react';
import styles from '../../styles/SetListPage.module.css'; 

const SearchBar = ({ onSearch, searchFilter, setSearchFilter }) => {
    const [keyword, setKeyword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchFilter, keyword);
    };

    const handleReset = () => {
        setKeyword('');
        setSearchFilter('정렬별');
        onSearch('정렬별', '');
    };

    return (
        <div className={styles.searchContainer}>
            <form onSubmit={handleSubmit}>
                <div className={styles.searchFilters}>
                    <select
                        value={searchFilter}
                        onChange={(e) => setSearchFilter(e.target.value)}
                        className={styles.filterSelect}
                    >
                        <option value="정렬별">정렬별</option>
                        <option value="공연명">공연명</option>
                        <option value="방송명">방송명</option>
                    </select>
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="찾고 있는 공연이 있나요?"
                        className={styles.searchInput}
                    />
                    <button type="submit" className={styles.searchButton}>검색</button>
                    <button type="button" className={styles.resetButton} onClick={handleReset}>초기화</button>
                </div>
            </form>
        </div>
    );
};

export default SearchBar;
