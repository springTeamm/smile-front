import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/BookingPage.module.css';

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hostNum = location.state?.hostNum || 1; 
  const locationName = location.state?.locationName || '';

  const [allRooms, setAllRooms] = useState([]);
  const [practiceRooms, setPracticeRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null); 
  const [bookedTimes, setBookedTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(''); 
  const [selectedHour, setSelectedHour] = useState(''); 
  const today = new Date().toISOString().split('T')[0]; 

  useEffect(() => {
    const fetchAllRooms = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/prdetails`);
        setAllRooms(response.data);
      } catch (err) {
        console.error('연습실 데이터를 가져오는 중 오류가 발생했습니다.', err);
      }
    };

    fetchAllRooms();
  }, []);

  useEffect(() => {
    if (allRooms.length > 0) {
      const filteredRooms = allRooms.filter(
        (room) => room.hostNum === hostNum && room.locationName === locationName
      );
      setPracticeRooms(filteredRooms);
      setSelectedRoom(filteredRooms[0] || null); 
    }
  }, [allRooms, hostNum, locationName]);

  useEffect(() => {
    const fetchBookedTimes = async () => {
      if (selectedDate && selectedRoom) {
        try {
          const response = await axios.get(`http://localhost:5000/booking/room/${selectedRoom.prNum}`, {
            params: { date: selectedDate },
          });
          setBookedTimes(response.data); 
        } catch (err) {
          console.error('예약된 시간 목록을 가져오는 중 오류가 발생했습니다.', err);
        }
      }
    };

    fetchBookedTimes();
  }, [selectedDate, selectedRoom]);

  const handleBookingClick = () => {
    if (!selectedDate || !selectedHour) {
      alert('예약 날짜와 시간을 선택해주세요.');
      return;
    }

    navigate('/bookingform', { state: { selectedDate, selectedHour, selectedRoom } });
  };

  const handleRoomChange = (prNum) => {
    const room = practiceRooms.find((room) => room.prNum === parseInt(prNum, 10));
    setSelectedRoom(room);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.imageSection}>
          {selectedRoom && (
            <>
              <div className={styles.imagePlaceholder}>
                <img src={selectedRoom.prImageUrl || '/placeholder.jpg'} alt="연습실 대표 이미지" />
              </div>
              <div className={styles.storeName}>{selectedRoom.prName}</div>
            </>
          )}
        </div>
        <div className={styles.details}>
          <label>
            연습실 선택
            <select
              className={styles.input}
              onChange={(e) => handleRoomChange(e.target.value)}
              value={selectedRoom?.prNum || ''}
            >
              {practiceRooms.length > 0 ? (
                practiceRooms.map((room) => (
                  <option key={room.prNum} value={room.prNum}>
                    {room.prName} - {room.prPrice.toLocaleString()}원
                  </option>
                ))
              ) : (
                <option>조건에 맞는 연습실이 없습니다</option>
              )}
            </select>
          </label>

          {selectedRoom && (
            <div className={styles.price}>
              {selectedRoom.prPrice ? `${selectedRoom.prPrice.toLocaleString()}원/시간` : '가격 정보 없음'}
            </div>
          )}

          <label>
            날짜 선택
            <input
              type="date"
              className={styles.input}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={today}
            />
          </label>

          <label>
            시간 선택
            <select
              className={styles.input}
              value={selectedHour}
              onChange={(e) => setSelectedHour(e.target.value)}
            >
              <option value="">시간을 선택해주세요</option>
              {selectedRoom &&
                selectedRoom.prOpenTime &&
                selectedRoom.prCloseTime &&
                Array.from(
                  {
                    length:
                      parseInt(selectedRoom.prCloseTime.split(':')[0], 10) -
                      parseInt(selectedRoom.prOpenTime.split(':')[0], 10),
                  },
                  (_, i) => parseInt(selectedRoom.prOpenTime.split(':')[0], 10) + i
                ).map((hour) => (
                  <option
                    key={hour}
                    value={hour}
                    disabled={bookedTimes.includes(`${hour}:00`)}
                  >
                    {hour}:00
                  </option>
                ))}
            </select>
          </label>

          <button className={styles.primaryButton} onClick={handleBookingClick}>
            예약 신청
          </button>

          <button className={styles.secondaryButton}>문의하기</button>
        </div>
      </div>

      <div className={styles.textNav}>
        <span>장소소개</span> | <span>이용 규칙</span> | <span>리뷰</span>
      </div>

      <div className={styles.content}>
        <section>
          <h2>장소 소개</h2>
          {selectedRoom && (
            <ul>
              <li><strong>주소:</strong> {selectedRoom.prAddress}</li>
              <li><strong>주차 가능 여부:</strong> {selectedRoom.prParking}</li>
              <li><strong>최대 인원:</strong> {selectedRoom.prMaxPerson}명</li>
              <li><strong>설명:</strong> {selectedRoom.prDescription || '설명 없음'}</li>
            </ul>
          )}
        </section>
        <section>
          <h2>이용 규칙</h2>
          <p>{selectedRoom ? selectedRoom.prWarnings : '이용 규칙 없음'}</p>
        </section>
        <section>
          <h2>리뷰</h2>
          <div className={styles.review}>
            <p>
              <strong>닉네임1</strong> <span className={styles.reviewDate}>2023-10-10</span>
            </p>
            <p>★★★★★</p>
            <p>리뷰 내용 1</p>
          </div>
          <div className={styles.review}>
            <p>
              <strong>닉네임2</strong> <span className={styles.reviewDate}>2023-11-09</span>
            </p>
            <p>★★★★☆</p>
            <p>리뷰 내용 2</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BookingPage;
