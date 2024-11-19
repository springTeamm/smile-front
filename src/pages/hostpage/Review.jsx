import React, { useState } from 'react';
import Searchcomponent from "../../components/host/Selectcomponent"; // 검색 컴포넌트 적용
import styles from "../hostpagecss/Cancellmanagement.module.css";
import Managertitle from "../../components/host/managertitle";
import textmodalstyles from "../hostpagecss/textmodal.module.css"
const Review = () => {
    const initialReviews = [
        { id: 1, locationName: '장소1', roomName: '방이름명1', userName: '김이이', starNum: '⭐ ⭐ ⭐ ⭐ ⭐' },
        { id: 2, locationName: '장소2', roomName: '방이름명2', userName: '박철수', starNum: '⭐ ⭐ ⭐ ⭐' },
        { id: 3, locationName: '장소3', roomName: '방이름명3', userName: '이영희', starNum: '⭐ ⭐ ⭐' },
    ];

    const [filteredReviews, setFilteredReviews] = useState(initialReviews);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const searchFields = [
        { name: 'locationName', label: '장소명', type: 'text' },
        { name: 'id', label: '리뷰번호', type: 'text' },
        { name: 'roomName', label: '방 이름', type: 'text' },
        { name: 'userName', label: '작성자명', type: 'text' }
    ];

    const handleSearch = (searchData) => {
        const filtered = initialReviews.filter(review =>
            (searchData.locationName ? review.locationName.includes(searchData.locationName) : true) &&
            (searchData.id ? String(review.id).includes(searchData.id) : true) &&
            (searchData.roomName ? review.roomName.includes(searchData.roomName) : true) &&
            (searchData.userName ? review.userName.includes(searchData.userName) : true)
        );
        setFilteredReviews(filtered);
    };

    const handleReset = () => {
        setFilteredReviews(initialReviews);
    };

    const handleReply = () => {
        alert("답글 작성 페이지로 이동합니다.");
    };

    const handleReport = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const totalReviews = filteredReviews.length;

    return (
        <div className={styles.allcontain}>
            <div className={styles.title}><Managertitle title={"리뷰 관리"} /></div>

            <div className={styles.search_section}>
                <Searchcomponent
                    fields={searchFields}
                    onSearch={handleSearch}
                    onReset={handleReset}
                />
            </div>



            <div className={styles.selecttotal}><h3>리뷰 목록 (총 <span className={styles.totaluserHighlight}>{totalReviews}</span>개)</h3></div>

            <div className={styles.table}>
                <div className={styles.totalbutton}>
                    <button className={styles.savebutton} onClick={handleReply}>
                        답글 달기
                    </button>
                    <button className={styles.savebutton} onClick={handleReport}>
                        신고
                    </button>
                </div>
                <div className={styles.table_container}>
                    <table>
                        <thead>
                        <tr>
                            <th>선택</th>
                            <th>번호</th>
                            <th>답글</th>
                            <th>장소명</th>
                            <th>방 이름</th>
                            <th>작성자명</th>
                            <th>평점</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredReviews.map((review) => (
                            <tr key={review.id}>
                                <td><input type="checkbox"/></td>
                                <td>{review.id}</td>
                                <td>
                                    <button className={styles.su}>등록</button>
                                </td>
                                <td>{review.locationName}</td>
                                <td>{review.roomName}</td>
                                <td>{review.userName}</td>
                                <td>{review.starNum}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className={textmodalstyles.modal}>
                    <div className={textmodalstyles.modaltotal}>
                    <div className={textmodalstyles.modalContent}>
                        <h3>리뷰를 신고하시겠습니까?</h3>
                        <p>신고 사유를 선택해주세요:</p>
                        <select>
                            <option value="abuse">욕설 및 비방</option>
                            <option value="spam">스팸</option>
                            <option value="other">기타</option>
                        </select>
                        <textarea placeholder="신고 내용을 작성해주세요." />
                        <div className={textmodalstyles.buttonGroup}>
                            <button className={textmodalstyles.savebutton} onClick={closeModal}>확인</button>
                            <button className={textmodalstyles.cancelbutton} onClick={closeModal}>취소</button>
                        </div>
                    </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Review;
