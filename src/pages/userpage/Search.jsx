import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/Search.module.css';
import Card from './Card';
import imagee from './images/공간 사진.jpg';

function Search() {
  // 상태 관리
  const [prDetails, setPrDetails] = useState([]);  // 연습실 상세 정보를 저장할 상태
  const [minPrice, setMinPrice] = useState(1000);  // 최소 가격 상태
  const [maxPrice, setMaxPrice] = useState(200000);  // 최대 가격 상태
  const [region, setRegion] = useState('');  // 지역 상태
  const [spaceType, setSpaceType] = useState(null);  // 공간 유형 상태
  const [error, setError] = useState(null);  // 오류 상태

  // 데이터 가져오기
  const fetchFilteredData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/prdetails', {
        params: {
          minPrice,
          maxPrice,
          region,
          spaceType,
        },
        withCredentials: true,  // 자격 증명 전달 (CORS와 관련된 문제 해결)
      });

      console.log('응답 데이터:', response.data);  // 응답 데이터 확인

      // 확인: API 응답 데이터에서 prName이 있는지 확인
      response.data.forEach((room, index) => {
        console.log(`Room ${index + 1}: prName = ${room.prName}, prPrice = ${room.prPrice}`);
      });

      setPrDetails(response.data);  // 데이터 상태 업데이트
      setError(null);  // 오류 상태 초기화
    } catch (err) {
      console.error('API 요청 오류:', err);
      setError('데이터를 가져오는 중 오류가 발생했습니다.');  // 오류 메시지 설정
    }
  };

  // 필터가 변경될 때마다 데이터 다시 가져오기
  useEffect(() => {
    fetchFilteredData();  // 데이터 가져오기 함수 호출
  }, [minPrice, maxPrice, region, spaceType]);

  // 가격 변경 핸들러
  const handlePriceChange = (e) => {
    const value = Number(e.target.value);
    if (e.target.name === 'min') {
      setMinPrice(Math.min(value, maxPrice - 1000));  // 최소 가격은 최대 가격보다 작아야 함
    } else {
      setMaxPrice(Math.max(value, minPrice + 1000));  // 최대 가격은 최소 가격보다 커야 함
    }
  };

  // 확인: 상태 업데이트 후 prDetails 값 확인
  console.log('Filtered Practice Rooms:', prDetails);  // Log the state of prDetails

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
                onChange={(e) => setRegion(e.target.value)}  // 지역 상태 변경
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
                onChange={handlePriceChange}  // 가격 범위 변경
              />
              <input
                type="range"
                min="1000"
                max="200000"
                step="1000"
                value={maxPrice}
                name="max"
                onChange={handlePriceChange}  // 가격 범위 변경
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
              onChange={(e) => setSpaceType(e.target.value ? parseInt(e.target.value) : null)}  // 공간 유형 상태 변경
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

      {error && <p className={styles.error}>{error}</p>}  {/* 오류 메시지 표시 */}
      <Card prDetails={prDetails} />  {/* 카드 컴포넌트에 prDetails 전달 */}
    </div>
  );
}

export default Search;
