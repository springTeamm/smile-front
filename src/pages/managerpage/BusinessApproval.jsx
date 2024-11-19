import React, { useState } from 'react';
import styles from "./UserManager.module.css";
import Pagecontroll from "../../components/manager/Pagecontroll";
import Managericon from "../../components/manager/managericon";
import Selectcomponent from "../../components/host/Selectcomponent";
import Dateselect from "../../components/host/dateselect";

const BusinessApproval = () => {

    const searchFields = [
        {
            name: 'hostName',
            label: '호스트 명',
            type: 'text',
        },
        {
            name: 'email',
            label: '이메일',
            type: 'text',
        },
        {
            name: 'businessNumber',
            label: '사업자 번호',
            type: 'text',
        },
        {
            name: 'hostPhone',
            label: '호스트 전화번호',
            type: 'text',
        }
    ];


    const initialBusinessApprovals = [
        {
            id: 1,
            businessType: "국내",
            hostName: "김이이",
            hostPhone: "010-1111-1111",
            businessNumber: "000-00-00000",
            validityCheck: "Y",
            location: "(우 12345) 서울 노원구",
            businessCategory: "개인",
            businessForm: "각종 연습실 대여 외",
            businessField: "각종 연습실 대여 외",
            salesReportNumber: "2020 노원 공릉동 0000",
            email: "asd****@naver.com"
        },
        {
            id: 2,
            businessType: "국내",
            hostName: "김이이",
            hostPhone: "010-1111-1111",
            businessNumber: "000-00-00000",
            validityCheck: "Y",
            location: "(우 12345) 서울 노원구",
            businessCategory: "개인",
            businessForm: "각종 연습실 대여 외",
            businessField: "각종 연습실 대여 외",
            salesReportNumber: "2020 노원 공릉동 0000",
            email: "asd****@naver.com"
        },
        {
            id: 3,
            businessType: "국내",
            hostName: "김이이",
            hostPhone: "010-1111-1111",
            businessNumber: "000-00-00000",
            validityCheck: "Y",
            location: "(우 12345) 서울 노원구",
            businessCategory: "개인",
            businessForm: "각종 연습실 대여 외",
            businessField: "각종 연습실 대여 외",
            salesReportNumber: "2020 노원 공릉동 0000",
            email: "asd****@naver.com"
        }
    ];

    const [businessApprovals, setBusinessApprovals] = useState(initialBusinessApprovals);
    const totalApprovals = businessApprovals.length;

    const handleSearch = (searchData) => {
        const filteredApprovals = initialBusinessApprovals.filter(approval =>
            (searchData.hostName ? approval.hostName.includes(searchData.hostName) : true) &&
            (searchData.email ? approval.email.includes(searchData.email) : true) &&
            (searchData.businessNumber ? approval.businessNumber.includes(searchData.businessNumber) : true) &&
            (searchData.hostPhone ? approval.hostPhone.includes(searchData.hostPhone) : true)
        );
        setBusinessApprovals(filteredApprovals);
    };
    const approvalSave=()=>{
        alert("사업자 승인으로 바꿔주는 백엔드 연동 필요")
    }
    const appocalManager=()=>{
        alert("사업자 반려 처리하는 백엔드 연동")
    }

    const handleReset = () => {
        setBusinessApprovals(initialBusinessApprovals);
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}><Pagecontroll title="사업자 승인 관리"/></div>

            <div className={styles.search_section}>
                <Selectcomponent
                    fields={searchFields}
                    onSearch={handleSearch}
                    onReset={handleReset}
                />
            </div>
            <div className={styles.title}><Dateselect text={"목록"} totalnum={totalApprovals} /> </div>
            <div className={styles.titledetail}><h3>사업자 승인 관리 목록</h3></div>
            <div className={styles.table}>
            <button onClick={approvalSave}>사업자 승인 처리</button>
            <button onClick={appocalManager}>사업자 반려 처리</button>

            <div className={styles.table_container}>
                <table>
                    <thead>
                    <tr>
                        <th>선택</th>
                        <th>사업자 유형</th>
                        <th>호스트 이름</th>
                        <th>호스트 전화번호</th>
                        <th>사업자 번호</th>
                        <th>진위 여부</th>
                        <th>사업장 소재지</th>
                        <th>사업자 구분</th>
                        <th>업태</th>
                        <th>업종</th>
                        <th>통신 판매업 신고 번호</th>
                        <th>로그인 이메일</th>
                    </tr>
                    </thead>
                    <tbody>
                    {businessApprovals.map((approval, index) => (
                        <tr key={approval.id}>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>{approval.businessType}</td>
                            <td>{approval.hostName}</td>
                            <td>{approval.hostPhone}</td>
                            <td>{approval.businessNumber}</td>
                            <td>{approval.validityCheck === "Y" ? "확인됨" : "확인 안됨"}</td>
                            <td>{approval.location}</td>
                            <td>{approval.businessCategory}</td>
                            <td>{approval.businessForm}</td>
                            <td>{approval.businessField}</td>
                            <td>{approval.salesReportNumber}</td>
                            <td>{approval.email}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>


    );
};

export default BusinessApproval;
