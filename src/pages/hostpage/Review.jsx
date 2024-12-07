import React, { useState, useEffect } from "react";
import axios from "axios";
import Searchcomponent from "../../components/host/Selectcomponent"; // 검색 컴포넌트
import styles from "../hostpagecss/Cancellmanagement.module.css";
import Managertitle from "../../components/host/managertitle";
import textmodalstyles from "../hostpagecss/textmodal.module.css";
import Selectcomponent from "../../components/host/Selectcomponent";

const Review = () => {
    const [reviews, setReviews] = useState([]); // 전체 리뷰 데이터
    const [filteredReviews, setFilteredReviews] = useState([]); // 검색 필터링된 리뷰
    const [selectedReviews, setSelectedReviews] = useState([]); // 체크박스 선택된 리뷰 번호
    const [isReplyModalOpen, setIsReplyModalOpen] = useState(false); // 답글 모달 상태
    const [replyText, setReplyText] = useState(""); // 답글 내용
    const [individualReviewId, setIndividualReviewId] = useState(null); // 개별 답글용 리뷰 ID
    const [currentReplies, setCurrentReplies] = useState([]); // 현재 답글 리스트
    const [isViewRepliesModalOpen, setIsViewRepliesModalOpen] = useState(false); // 답글 모달 상태
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/hostpage/review");
                const allReviews = response.data;

                // 전체 데이터를 저장 (답글 포함)
                setReviews(allReviews);

                // topReviewNum이 없는 리뷰만 필터링하여 초기 필터링 데이터 설정
                const filtered = allReviews.filter((review) => !review.topReviewNum);
                setFilteredReviews(filtered);
            } catch (error) {
                console.error("리뷰 데이터를 가져오는 중 오류 발생:", error);
            }
        };

        fetchReviews();
    }, []);


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
        const { hostAddress, reviewNum,roomName,userName } = searchData;
        let filtered = [...reviews];

        // 방 이름 필터링
        if (hostAddress) {
            filtered = filtered.filter((review) =>
                review.hostAddress.toLowerCase().includes(hostAddress.toLowerCase())
            );
        }

        // 방 번호 필터링
        if (reviewNum) {
            filtered = filtered.filter((review) =>
                review.reviewNum.toString().includes(reviewNum)
            );
        }
        // 방 이름 필터링
        if (roomName) {
            filtered = filtered.filter((review) =>
                review.roomName.toLowerCase().includes(roomName.toLowerCase())
            );
        }

        // 방 이름 필터링
        if (userName) {
            filtered = filtered.filter((review) =>
                review.userName.toLowerCase().includes(userName.toLowerCase())
            );
        }

        setFilteredReviews(filtered);
    };

    const handleReset = () => {
        setFilteredReviews(reviews);
    };
    // 특정 리뷰의 답글 가져오기
    const handleViewReplies = async (reviewNum) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/hostpage/review/${reviewNum}/replies`);
            setCurrentReplies(response.data); // 현재 답글 리스트 설정
            setIndividualReviewId(reviewNum);
            setIsViewRepliesModalOpen(true); // 답글 모달 열기
        } catch (error) {
            console.error("답글 데이터를 가져오는 중 오류 발생:", error);
        }
    };

    const countReplies = (reviewNum) => {
        return reviews.filter((review) => review.topReviewNum === reviewNum).length;
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

    const handleIndividualReply = async () => {
        if (!individualReviewId) return;

        try {
            await axios.post(`http://localhost:5000/api/hostpage/review/${individualReviewId}/reply`, null, {
                params: { text: replyText },
            });
            alert("개별 답글이 등록되었습니다.");

            // 최신 리뷰 데이터 가져오기
            const response = await axios.get("http://localhost:5000/api/hostpage/review");
            const allReviews = response.data;
            const filtered = allReviews.filter((review) => !review.topReviewNum || review.topReviewNum === null);
            setReviews(filtered);
            setFilteredReviews(filtered);

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
    const clostcontentModal =()=>{
        setIsViewRepliesModalOpen(false);
        setReplyText("")
    }

    return (
        <div className={styles.allcontain}>
            <div className={styles.title}>
                <Managertitle title={"리뷰 관리"}/>
            </div>
            <div className={styles.search_section}>
                <Selectcomponent
                    fields={[
                        {name: "hostAddress", label: "장소명", type: "text"},
                        {name: "reviewNum", label: "리뷰번호", type: "text"},
                        {name: "roomName", label: "방 이름", type: "text"},
                        {name: "userName", label: "작성자명", type: "text"},
                    ]}
                    onSearch={handleSearch}
                    onReset={handleReset}
                />

            </div>
            <div className={styles.selecttotal}>
                <h3>리뷰 목록 (총 <span className={styles.totaluserHighlight}>{reviews.length}</span>개)</h3>
            </div>


            <div className={styles.table}>
                <div className={styles.totalbutton}>
                    <button onClick={() => setIsReplyModalOpen(true)}>답글 달기</button>
                </div>

                {/* 모달 */}
                {isReplyModalOpen && (
                    <div className={textmodalstyles.modal}>
                        <div className={textmodalstyles.modaltotal}>
                        <div className={textmodalstyles.modalContent}>
                            <div className={textmodalstyles.modalTitle}> <h3>{individualReviewId ? "개별 답글 등록" : "공통 답글 등록"}</h3></div>

                            <textarea
                                className={textmodalstyles.modalContent}
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="답글 내용을 입력하세요."
                            ></textarea>
                            <div>
                                <button
                                    className={textmodalstyles.savebutton}
                                    onClick={
                                        individualReviewId
                                            ? handleIndividualReply
                                            : handleSendReplyForSelected
                                    }
                                >
                                    저장
                                </button>
                                <button className={textmodalstyles.cancelbutton} onClick={closeReplyModal}>취소</button>
                            </div>
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
                            <th>댓글 내용</th>
                            <th>답글 개수</th>
                            <th>답글 보기</th>
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
                                <td>{review.reviewContent}</td>
                                <td>{countReplies(review.reviewNum)}</td>
                                <td>
                                    <button
                                        className={styles.su}
                                        onClick={() => handleViewReplies(review.reviewNum)}
                                    >
                                        답글 보기
                                    </button>

                                </td>

                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isViewRepliesModalOpen && (
                <div className={textmodalstyles.modal}>
                    <div className={textmodalstyles.modaltotal}>
                        <div className={textmodalstyles.modalContent}>
                            <h3>답글 보기</h3>
                            {currentReplies.length > 0 ? (
                                <div className={textmodalstyles.replyList}>
                                    {currentReplies.map((reply, index) => (
                                        <div key={index} className={textmodalstyles.replyItem}>
                                            <p>
                                                <strong>작성자:</strong> {reply.userName || "익명"}<br />
                                                <strong>답글 번호:</strong> {reply.reviewId}<br />
                                                <strong>답글 내용:</strong> {reply.reviewContent}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>답글이 없습니다.</p>
                            )}
                            <button
                                className={textmodalstyles.closebutton}
                                onClick={clostcontentModal}
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Review;
