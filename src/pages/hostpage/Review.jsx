import React, { useState, useEffect } from "react";
import axios from "axios";
import Searchcomponent from "../../components/host/Selectcomponent"; // 검색 컴포넌트
import styles from "../hostpagecss/Cancellmanagement.module.css";
import Managertitle from "../../components/host/managertitle";
import textmodalstyles from "../hostpagecss/textmodal.module.css";

const Review = () => {
    const [reviews, setReviews] = useState([]); // 전체 리뷰 데이터
    const [filteredReviews, setFilteredReviews] = useState([]); // 검색 필터링된 리뷰
    const [selectedReviews, setSelectedReviews] = useState([]); // 체크박스 선택된 리뷰 번호
    const [isReplyModalOpen, setIsReplyModalOpen] = useState(false); // 답글 모달 상태
    const [replyText, setReplyText] = useState(""); // 답글 내용
    const [individualReviewId, setIndividualReviewId] = useState(null); // 개별 답글용 리뷰 ID

    // 리뷰 데이터 가져오기
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/hostpage/review");
                const allReviews = response.data;

                // 답글(TopReviewNum이 있는 리뷰) 제외
                const filtered = allReviews.filter((review) => !review.topReviewNum);
                setReviews(allReviews);
                setFilteredReviews(filtered);
            } catch (error) {
                console.error("리뷰 데이터를 가져오는 중 오류 발생:", error);
            }
        };
        fetchReviews();
    }, []);

    const searchFields = [
        { name: "locationName", label: "장소명", type: "text" },
        { name: "id", label: "리뷰번호", type: "text" },
        { name: "roomName", label: "방 이름", type: "text" },
        { name: "userName", label: "작성자명", type: "text" },
    ];

    // 체크박스 선택/해제
    const toggleReviewSelection = (reviewNum) => {
        if (selectedReviews.includes(reviewNum)) {
            setSelectedReviews(selectedReviews.filter((num) => num !== reviewNum));
        } else {
            setSelectedReviews([...selectedReviews, reviewNum]);
        }
    };

    // 검색 필터링 처리
    const handleSearch = (searchData) => {
        const filtered = reviews.filter((review) =>
            (searchData.locationName ? review.locationName.includes(searchData.locationName) : true) &&
            (searchData.id ? String(review.reviewNum).includes(searchData.id) : true) &&
            (searchData.roomName ? review.roomName.includes(searchData.roomName) : true) &&
            (searchData.userName ? review.userName.includes(searchData.userName) : true)
        );
        setFilteredReviews(filtered);
    };

    const handleReset = () => {
        setFilteredReviews(reviews);
    };

    // 공통 답글 등록
    const handleSendReplyForSelected = async () => {
        if (selectedReviews.length === 0) {
            alert("선택된 리뷰가 없습니다.");
            return;
        }
        try {
            for (const reviewNum of selectedReviews) {
                await axios.post(`http://localhost:5000/api/hostpage/review/${reviewNum}/reply`, null, {
                    params: { text: replyText },
                });
            }
            alert("선택된 리뷰에 답글이 등록되었습니다.");
            setSelectedReviews([]); // 체크박스 초기화
            setReplyText(""); // 답글 초기화
            setIsReplyModalOpen(false); // 모달 닫기
        } catch (error) {
            console.error("답글 등록 중 오류 발생:", error);
        }
    };

    // 개별 답글 등록
    const handleIndividualReply = async () => {
        if (!individualReviewId) return;

        try {
            await axios.post(`http://localhost:5000/api/hostpage/review/${individualReviewId}/reply`, null, {
                params: { text: replyText },
            });
            alert("개별 답글이 등록되었습니다.");
            setIsReplyModalOpen(false); // 모달 닫기
            setReplyText(""); // 답글 초기화
        } catch (error) {
            console.error("개별 답글 등록 중 오류 발생:", error);
        }
    };

    // 개별 답글 모달 열기
    const openReplyModalForIndividual = (reviewNum) => {
        setIndividualReviewId(reviewNum);
        setIsReplyModalOpen(true);
    };

    // 답글 모달 닫기
    const closeReplyModal = () => {
        setIsReplyModalOpen(false);
        setReplyText(""); // 답글 초기화
    };

    return (
        <div className={styles.allcontain}>
            <div className={styles.title}>
                <Managertitle title={"리뷰 관리"} />
            </div>
            <div className={styles.search_section}>
                <Searchcomponent
                    fields={searchFields}
                    onSearch={handleSearch}
                    onReset={handleReset}
                />
            </div>

            <div className={styles.table}>
                <div className={styles.totalbutton}>
                    <button onClick={() => setIsReplyModalOpen(true)}>답글 달기</button>
                </div>

                {/* 모달 */}
                {isReplyModalOpen && (
                    <div className={textmodalstyles.modal}>
                        <div className={textmodalstyles.modalContent}>
                            <h3>{individualReviewId ? "개별 답글 등록" : "공통 답글 등록"}</h3>
                            <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="답글 내용을 입력하세요."
                            ></textarea>
                            <div>
                                <button
                                    onClick={
                                        individualReviewId
                                            ? handleIndividualReply
                                            : handleSendReplyForSelected
                                    }
                                >
                                    확인
                                </button>
                                <button onClick={closeReplyModal}>취소</button>
                            </div>
                        </div>
                    </div>
                )}

                <div className={styles.table_container}>
                    <table>
                        <thead>
                        <tr>
                            <th>선택</th>
                            <th>답글</th>
                            <th>번호</th>
                            <th>장소명</th>
                            <th>방 이름</th>
                            <th>작성자명</th>
                            <th>평점</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredReviews.map((review) => (
                            <tr key={review.reviewNum}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedReviews.includes(review.reviewNum)}
                                        onChange={() => toggleReviewSelection(review.reviewNum)}
                                    />
                                </td>
                                <td>
                                    <button
                                        className={styles.su}
                                        onClick={() => openReplyModalForIndividual(review.reviewNum)}
                                    >
                                        등록
                                    </button>
                                </td>
                                <td>{review.reviewNum}</td>
                                <td>{review.hostAddress}</td>
                                <td>{review.roomName}</td>
                                <td>{review.userName}</td>
                                <td>{"⭐".repeat(review.reviewStarScore)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Review;
