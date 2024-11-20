import React, { useState } from 'react';
import styles from "./UserManager.module.css";
import Pagecontroll from "../../components/manager/Pagecontroll";
import Managericon from "../../components/manager/managericon";
import Selectcomponent from "../../components/host/Selectcomponent";
import Dateselect from "../../components/host/dateselect";
import roomstyles from "../../pages/hostpagecss/Roomstyle.module.css";

const InquiryManagement = () => {
    // 검색 필드 설정
    const text = [
        {
            name: 'inquiryDate',
            label: '문의 날짜',
            type: 'date', // 날짜 선택 필드
        },
        {
            name: 'username',
            label: '이름 검색',
            type: 'text', // 텍스트 입력 필드
        }
    ];

    // 초기 사용자 및 문의 데이터
    const initialInquiries = [
        {
            id: 1,
            usernumber: 1011,
            username: "홍길동",
            userid: "상큼젤리",
            inquiryDate: "2023-10-05",
            inquiryContent: "예약 관련 문의",
            responseStatus: "N",
            inquiryTitle: "예약 취소 문의",
            inquiryDetail: "예약 취소 절차에 대해 궁금합니다.",
        },
        {
            id: 2,
            usernumber: 1022,
            username: "세종대왕",
            userid: "달콤캔디",
            inquiryDate: "2023-10-10",
            inquiryContent: "결제 관련 문의",
            responseStatus: "Y",
            inquiryTitle: "결제 확인 요청",
            inquiryDetail: "결제 확인이 지연되고 있습니다.",
        },
    ];

    const [inquiries, setInquiries] = useState(initialInquiries);
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [isResponding, setIsResponding] = useState(false); // 답변 작성 중 상태
    const [responseText, setResponseText] = useState(""); // 답변 내용


    const totalInquiries = inquiries.length;
    const unansweredInquiries = inquiries.filter(field => field.responseStatus === "N").length;
    const answeredInquiries = inquiries.filter(field => field.responseStatus === "Y").length;

    const handleSearch = (searchData) => {
        const filteredInquiries = initialInquiries.filter(inquiry =>
            (searchData.username ? inquiry.username.includes(searchData.username) : true) &&
            (searchData.inquiryDate ? inquiry.inquiryDate === searchData.inquiryDate : true)
        );
        setInquiries(filteredInquiries);
    };

    const handleReset = () => {
        setInquiries(initialInquiries);
    };

    const handleViewDetails = (inquiry) => {
        setSelectedInquiry(inquiry);
        setIsResponding(false); // 세부 내용  답변 작성 모드ㄴㄴ
    };

    const handleRespond = () => {
        setIsResponding(true);
        setResponseText("");
    };

    const handleCompleteResponse = () => {
        // 작성 완료 후 문의 응답 상태를 'Y'로 변경
        const updatedInquiries = inquiries.map(inquiry =>
            inquiry.id === selectedInquiry.id ? { ...inquiry, responseStatus: "Y" } : inquiry
        );
        setInquiries(updatedInquiries);
        setSelectedInquiry(null);
        setIsResponding(false);
        setResponseText("");
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}><Pagecontroll title="문의 확인"/></div>
            <div className={styles.icon}>
                <Managericon
                    totaluser={totalInquiries}
                    hostuser={unansweredInquiries}
                    saveroom={answeredInquiries}
                    rentalStopped={"2"}
                    text1={"총 문의 건수"}
                    text2={"미응답 문의"}
                    text3={"응답 문의"}
                />
            </div>
            <div className={styles.search_section}>
                <Selectcomponent
                    fields={text}
                    onSearch={handleSearch}
                    onReset={handleReset}
                />
            </div>
            <div className={styles.title}>
                <Dateselect text={"목록"} totalnum={totalInquiries}/>
            </div>
            <div className={styles.titledetail}><h3>문의 목록</h3></div>
            <div className={styles.table}>
                <div className={styles.table_container}>
                    <table>
                        <thead>
                        <tr>
                            <th>번호</th>
                            <th>유저 번호</th>
                            <th>유저 이름</th>
                            <th>유저 닉네임</th>
                            <th>문의 날짜</th>
                            <th>문의 내역</th>
                            <th>응답 여부</th>
                            <th>세부내용</th>
                        </tr>
                        </thead>
                        <tbody>
                        {inquiries.map((inquiry, index) => (
                            <tr key={inquiry.id}>
                                <td>{index + 1}</td>
                                <td>{inquiry.usernumber}</td>
                                <td>{inquiry.username}</td>
                                <td>{inquiry.userid}</td>
                                <td>{inquiry.inquiryDate}</td>
                                <td>{inquiry.inquiryContent}</td>
                                <td>{inquiry.responseStatus === "Y" ? "응답 완료" : "미응답"}</td>
                                <td>
                                    <button
                                        className={styles.button}
                                        onClick={() => handleViewDetails(inquiry)}
                                    >
                                        확인
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 문의 세부내용 모달 */}
            {selectedInquiry && (
                <div className={roomstyles.modal}>
                    <div className={roomstyles.modaltitle}><h3>문의 세부 내용</h3></div>
                    <div className={roomstyles.modal_content}>
                        <div className={roomstyles.modaldetailcontent}>
                            {isResponding ? (
                                <>
                                    <p><strong>문의 고객:</strong> {selectedInquiry.username}</p>

                                    <p><strong>문의 제목:</strong> {selectedInquiry.inquiryTitle}</p>

                                    <textarea
                                        placeholder="답변 내용을 입력하세요..."
                                        value={responseText}
                                        onChange={(e) => setResponseText(e.target.value)}
                                        className={roomstyles.textarea}
                                    />
                                </>
                                ) : (
                                // 세부 내용 확인 모드

                                <>
                                <p><strong>문의 유형:</strong></p>
                                <select
                                    value={selectedInquiry.inquiryContent || "default"}
                                    onChange={(e) => setSelectedInquiry({
                                        ...selectedInquiry,
                                        inquiryContent: e.target.value
                                    })}

                                >
                                    <option value="default" disabled>문의 유형</option>
                                    <option value="시스템 오류">시스템 오류</option>
                                    <option value="기타 오류">기타 오류</option>
                                    <option value="기타">기타</option>
                                </select>
                                    <p><strong>문의 제목:</strong> {selectedInquiry.inquiryTitle}</p>
                                    <p><strong>문의 내용:</strong> {selectedInquiry.inquiryDetail}</p>
                                </>
                            )}
                        </div>
                        <div className={roomstyles.room_table}>
                            {isResponding ? (
                                <button
                                    onClick={handleCompleteResponse}
                                    className={roomstyles.complete_button}
                                >
                                    작성 완료
                                </button>
                            ) : (

                                <button
                                    onClick={handleRespond}
                                    className={roomstyles.respond_button}
                                >
                                    답변하기
                                </button>

                            )}
                            <button
                                onClick={() => setSelectedInquiry(null)}
                                className={roomstyles.close_button}
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

export default InquiryManagement;
