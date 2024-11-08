import '../../styles/Category.css';
import React, { useState } from 'react';

function Category() {
  const [minPrice, setMinPrice] = useState(20000);
  const [maxPrice, setMaxPrice] = useState(120000);
  const [category, setCategory] = useState('연습실');
  const [region, setRegion] = useState('서울');

  const handlePriceChange = (e) => {
    const value = +e.target.value;
    if (e.target.name === 'min') {
      setMinPrice(Math.min(value, maxPrice - 1000));
    } else {
      setMaxPrice(Math.max(value, minPrice + 1000));
    }
  };

  return (
    <div className="filter-container">
      {/* Location Search */}
      <div className="filter-item">
        <label>위치</label>
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="주변 지하철 역이나 지역을 검색해보세요" />
        </div>
      </div>

      {/* Price Range */}
      <div className="filter-item">
        <label>비용</label>
        <div className="price-range">
          <input
            type="range"
            min="20000"
            max="120000"
            step="1000"
            value={minPrice}
            name="min"
            onChange={handlePriceChange}
          />
          <input
            type="range"
            min="20000"
            max="120000"
            step="1000"
            value={maxPrice}
            name="max"
            onChange={handlePriceChange}
          />
          <div
            className="range-bar"
            style={{
              left: `${((minPrice - 20000) / (120000 - 20000)) * 100}%`,
              width: `${((maxPrice - minPrice) / (120000 - 20000)) * 100}%`,
            }}
          />
        </div>
        <div className="price-labels">
          <span>{minPrice.toLocaleString()}원</span>
          <span>~</span>
          <span>{maxPrice.toLocaleString()}원</span>
        </div>
      </div>

      {/* Category Dropdown */}
      <div className="filter-item">
        <label>공간 별</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="dropdown"
        >
          <option value="연습실">연습실</option>
          <option value="밴드 연습실">밴드 연습실</option>
          <option value="댄스 연습실">댄스 연습실</option>
          <option value="음악 연습실">음악 연습실</option>
        </select>
      </div>

      {/* Region Dropdown */}
      <div className="filter-item">
        <label>지역 별</label>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="dropdown"
        >
          <option value="서울">서울</option>
          <option value="경기">경기</option>
          <option value="인천">인천</option>
          <option value="부산">부산</option>
          <option value="강원">강원</option>
          <option value="충청">충청</option>
          <option value="전라">전라</option>
          <option value="경상">경상</option>
          <option value="제주">제주</option>
        </select>
      </div>
    </div>
  );
}

export default Category;
