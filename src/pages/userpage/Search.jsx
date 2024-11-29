import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import styles from '../../styles/Search.module.css';
import Card from './Card';
import imagee from './images/공간 사진.jpg';

function Search() {
  const [prDetails, setPrDetails] = useState([]);
  const [minPrice, setMinPrice] = useState(1000);
  const [maxPrice, setMaxPrice] = useState(200000);
  const [region, setRegion] = useState('');
  const [spaceType, setSpaceType] = useState(null);
  const [error, setError] = useState(null);

  const fetchFilteredData = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/prdetails', {
        params: {
          minPrice,
          maxPrice,
          region,
          spaceType,
        },
        withCredentials: true,
      });

      console.log('응답 데이터:', response.data);
      setPrDetails(response.data);
      setError(null);
    } catch (err) {
      console.error('API 요청 오류:', err);
      setError('데이터를 가져오는 중 오류가 발생했습니다.');
    }
  }, [minPrice, maxPrice, region, spaceType]);  

  useEffect(() => {
    fetchFilteredData();
  }, [fetchFilteredData]); 

  const handlePriceChange = (e) => {
    const value = Number(e.target.value);
    if (e.target.name === 'min') {
      setMinPrice(Math.min(value, maxPrice - 1000));
    } else {
      setMaxPrice(Math.max(value, minPrice + 1000));
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.pageContainer}>
        <div className={styles.imageContainer}>
          <img src={imagee} alt="Placeholder" />
        </div>

        <div className={styles.filterContainer}>
          <div className={styles.filterItem}>
            <label>위치</label>
            <div className={styles.searchBar}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="주변 지하철 역이나 지역을 검색해보세요"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.filterItem}>
            <label>비용</label>
            <div className={styles.priceRange}>
              <input
                type="range"
                min="1000"
                max="200000"
                step="1000"
                value={minPrice}
                name="min"
                onChange={handlePriceChange}
              />
              <input
                type="range"
                min="1000"
                max="200000"
                step="1000"
                value={maxPrice}
                name="max"
                onChange={handlePriceChange}
              />
              <div
                className={styles.rangeBar}
                style={{
                  left: `${((minPrice - 1000) / (200000 - 1000)) * 100}%`,
                  width: `${((maxPrice - minPrice) / (200000 - 1000)) * 100}%`,
                }}
              />
            </div>
            <div className={styles.priceLabels}>
              <span>{minPrice.toLocaleString()}원</span>
              <span>~</span>
              <span>{maxPrice.toLocaleString()}원</span>
            </div>
          </div>

          <div className={styles.filterItem}>
            <label>공간 별</label>
            <select
              value={spaceType || ''}
              onChange={(e) => setSpaceType(e.target.value ? parseInt(e.target.value) : null)}
              className={styles.dropdown}
            >
              <option value="">전체</option>
              <option value="1">연습실</option>
              <option value="2">밴드 연습실</option>
              <option value="3">댄스 연습실</option>
              <option value="4">음악 연습실</option>
            </select>
          </div>
        </div>
      </div>

      {error && <p className={styles.error}>{error}</p>}
      <Card prDetails={prDetails} />
    </div>
  );
}

export default Search;
