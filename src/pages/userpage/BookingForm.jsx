import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/BookingForm.module.css';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    startTime: '',
    duration: 1,
    totalPerson: 1,
  });

  const [availableTimes, setAvailableTimes] = useState([]); 
  const [bookedTimes, setBookedTimes] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const today = new Date().toISOString().split('T')[0];

  
  useEffect(() => {
    if (formData.date) {
      axios
        .get('http://localhost:8080/booking/room/1', {
          params: { date: formData.date },
        })
        .then((response) => {
          const rawBookedTimes = response.data;

          const blockedTimes = [];
          rawBookedTimes.forEach((booking) => {
            const startHour = parseInt(booking.startTime.split(':')[0], 10);
            const duration = parseInt(booking.duration, 10);
            for (let i = 0; i < duration; i++) {
              blockedTimes.push(`${startHour + i}:00`);
            }
          });

          setBookedTimes(blockedTimes);
        })
        .catch((err) => {
          console.error('예약된 시간 목록을 가져오는 중 오류가 발생했습니다.', err);
        });
    }
  }, [formData.date]);

  useEffect(() => {
    const times = [];
    for (let hour = 9; hour <= 21; hour++) {
      const timeString = `${hour < 10 ? '0' : ''}${hour}:00`;
      if (!bookedTimes.includes(timeString)) {
        times.push(timeString); 
      }
    }
    setAvailableTimes(times);
  }, [bookedTimes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBookingAndPayment = async () => {
    try {
      const totalPrice = formData.duration * 50000; 
      

      const response = await axios.post('http://localhost:5000/booking/reserve', {
        prNum: 1, 
        bookingDate: formData.date,
        bookingStartTime: formData.startTime,
        bookingDuration: parseInt(formData.duration, 10),
        bookingTotalPerson: parseInt(formData.totalPerson, 10),
        bookingTotalPrice: totalPrice,
        userName: formData.name,
        userPhone: formData.phone,
      });

      const paymentData = response.data;

      const tossPaymentRequest = {
        amount: totalPrice,
        orderId: `order-${paymentData.bookingNum}`, 
        orderName: `Booking for ${formData.name}`, 
        successUrl: 'http://localhost:3000/payment-success', 
        failUrl: 'http://localhost:3000/payment-fail',
      };

      const tossResponse = await axios.post(
        'https://api.tosspayments.com/v1/payments',
        tossPaymentRequest,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${btoa('api key:')}`, 
          },
        }
      );

      if (tossResponse.data.paymentUrl) {
        window.location.href = tossResponse.data.paymentUrl;  
      } else {
        setError('결제 요청 실패. 다시 시도해주세요.');
      }
    } catch (err) {
      console.error('예약 및 결제 중 오류 발생:', err);
      setError('예약 및 결제 중 오류가 발생했습니다.');
      setSuccess('');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.Title}>연습실 예약</h1>

      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="name">성명 *</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="이용자의 성명을 입력해주세요"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="phone">휴대폰 번호 *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="이용자의 휴대폰 번호를 입력해주세요"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="date">예약 날짜 *</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={today}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="startTime">예약 시작 시간 *</label>
          <select
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          >
            <option value="">시간을 선택해주세요</option>
            {availableTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="duration">사용 시간 (시간 단위) *</label>
          <select
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          >
            {[...Array(10).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}시간
              </option>
            ))}
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="totalPerson">이용 인원 *</label>
          <select
            id="totalPerson"
            name="totalPerson"
            value={formData.totalPerson}
            onChange={handleChange}
          >
            {[...Array(10).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}명
              </option>
            ))}
          </select>
        </div>
      </form>

      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}

      <button className={styles.submitButton} onClick={handleBookingAndPayment}>
        결제 하기
      </button>
    </div>
  );
};

export default BookingForm;
