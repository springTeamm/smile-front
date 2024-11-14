import React, { useState } from 'react';

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
        <div className="search-container">
            <form onSubmit={handleSubmit}>
                <div className="search-filters">
                    <select
                        value={searchFilter}
                        onChange={(e) => setSearchFilter(e.target.value)}
                        className="filter-select"
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
                        className="search-input"
                    />
                    <button type="submit" className="search-button">검색</button>
                    <button type="button" className="reset-button" onClick={handleReset}>초기화</button>
                </div>
            </form>
        </div>
    );
};

export default SearchBar;
