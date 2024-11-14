import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import SetListView from '../components/SetListView';
import '../styles/setlist.css';

const SetListPage = () => {
    // 초기 데이터 추가
    const initialData = [
        {
            id: 1,
            title: '뮤지컬 라이온킹',
            location: '대구 계명아트센터',
            datetime: '2024.03.15 16:00-18:00',
            imageUrl: '/api/placeholder/300/200'
        },
        {
            id: 2,
            title: '뮤지컬 레미제라블',
            location: '서울 예술의전당',
            datetime: '2024.03.16 15:00-17:00',
            imageUrl: '/api/placeholder/300/200'
        },
        {
            id: 3,
            title: '연극 햄릿',
            location: '부산 문화회관',
            datetime: '2024.03.17 19:00-21:00',
            imageUrl: '/api/placeholder/300/200'
        },
        {
            id: 4,
            title: '오페라 투란도트',
            location: '인천 문화예술회관',
            datetime: '2024.03.18 18:30-21:30',
            imageUrl: '/api/placeholder/300/200'
        }
    ];

    const [searchResults, setSearchResults] = useState(initialData);  // 초기 데이터로 시작
    const [searchFilter, setSearchFilter] = useState('정렬별');

    const handleSearch = (searchType, keyword) => {
        if (!keyword) {
            setSearchResults(initialData);
            return;
        }

        const filteredResults = initialData.filter(item => {
            if (searchType === '공연명') {
                return item.title.includes(keyword);
            } else if (searchType === '방송명') {
                return item.location.includes(keyword);
            }
            return true;
        });

        setSearchResults(filteredResults);
    };

    return (
        <div className="setlist-container">
            <SearchBar
                onSearch={handleSearch}
                searchFilter={searchFilter}
                setSearchFilter={setSearchFilter}
            />
            <SetListView items={searchResults} />
        </div>
    );
};

export default SetListPage;