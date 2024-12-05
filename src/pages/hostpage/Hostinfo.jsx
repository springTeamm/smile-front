import React, {useEffect, useState} from 'react';
import styles from '../hostpagecss/Cancellmanagement.module.css';
import axios from 'axios';
import Managertitle from '../../components/host/managertitle';
import Hostdetail from '../../components/host/Hostdetail';
import roomstyles from '../hostpagecss/Roomstyle.module.css';

const Hostinfo = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hostInfo, setHostInfo] = useState({
        hostBisAddress: "정보 없음",
        hostRegistNum: "정보 없음",
        hostBisType: "정보 없음",
        hostCompanyName: "정보 없음",
        hostCorpName: "정보 없음",
        representativeName: "정보 없음",
        userId: "정보 없음",
        userEmail: "정보 없음",
        userPhone: "정보 없음",
    });

    const [isLoading, setIsLoading] = useState(true);
    // 임시 hostNum 값
    const hostNum = 1; // 이후 세션 기반으로 변경 가능

    useEffect(() => {
        const fetchHostInfo = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/hostpage/hostinfo?hostNum=1`);
                console.log(response); // 응답 확인
                const data = await response.json();
                console.log(data); // 데이터 확인
                setHostInfo(data);
            } catch (error) {
                console.error("Error fetching host info:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHostInfo();
    }, []);


    const handlechangemoney = () => {
        // 정산 정보 입금계좌 바꾸는 로직 추가
    };
    const handlecancell = () => {
        // 취소 버튼 로직 추가
    };
    const handlesubmit = () => {
        // 확인 버튼 로직 추가
    };
    const handlesearch = () => {
        // 연습실 찾기 로직 추가
    };
    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };
    const locationselect = ()=>{
        //주소 찾기 이건 api써야하나
    }
    return (
        <div className={styles.hostcontain}>
            <div className={styles.title}>
                <Managertitle title="호스트 정보" />
            </div>
            <div className={styles.hostdetailscroll}>
                <div className={styles.titledetail}><Managertitle title="호스트 정보"/></div>
                <div className={styles.titledetail}><Hostdetail hosttitle="호스트 유형" hostcontent="국내 사업자"/></div>
                <div className={styles.titledetail}><Hostdetail hosttitle="상호" hostcontent="00 연습실"/></div>
                <div className={styles.titledetail}>
                    <Hostdetail hosttitle="사업장 소재지" hostcontent={hostInfo.hostBisAddress || "정보 없음"}/>
                </div>
                <div className={styles.titledetail}>
                    <Hostdetail hosttitle="사업자 등록 번호" hostcontent={hostInfo.hostRegistNum || "정보 없음"}/>
                </div>
                <div className={styles.titledetail}>
                    <Hostdetail hosttitle="사업자 업종" hostcontent={hostInfo.hostBisType || "정보 없음"}/>
                </div>
                <div className={styles.titledetail}>
                    <Hostdetail hosttitle="기업 이름" hostcontent={hostInfo.hostCompanyName || "정보 없음"}/>
                </div>
                <div className={styles.titledetail}>
                    <Hostdetail hosttitle="법인 이름" hostcontent={hostInfo.hostCorpName || "정보 없음"}/>
                </div>
                <div className={styles.titledetail}>
                    <Hostdetail hosttitle="과세 유형" hostcontent={hostInfo.hostTaxType || "정보 없음"}/>
                </div>
                <div className={styles.titledetail}>
                    <Hostdetail hosttitle="대표자 이름" hostcontent={hostInfo.userName || "정보 없음"}/>
                </div>

            </div>
            <div className={styles.hostdetailscroll}>
                <div className={styles.titledetail}><Managertitle title="담당자 정보"/></div>
                <div className={styles.titledetail}>
                    <Hostdetail hosttitle="이름" hostcontent={hostInfo.representativeName || "정보 없음"}/>
                </div>
                <div className={styles.titledetail}>
                    <Hostdetail hosttitle="로그인 ID" hostcontent={hostInfo.userId || "정보 없음"}/>
                </div>
                <div className={styles.titledetail}>
                    <Hostdetail hosttitle="이메일" hostcontent={hostInfo.userEmail || "정보 없음"}/>
                </div>
                <div className={styles.titledetail}>
                    <Hostdetail hosttitle="전화번호" hostcontent={hostInfo.userPhone || "정보 없음"}/>
                </div>
                <div className={styles.titledetail}><Hostdetail hosttitle="비밀번호"
                                                                hostcontent={<input type="password"/>}/></div>
                <div className={styles.titledetail}><Hostdetail hosttitle="비밀번호 확인"
                                                                hostcontent={<input type="password"/>}/></div>
            </div>

            <div className={styles.hostdetailscroll}>
                <div className={styles.titledetail}><Managertitle title="연습실 정보"/></div>
                <div className={styles.titledetail}><Hostdetail hosttitle="연습실 주소" hostcontent={<input/>}/>

                    <button className={styles.button} onClick={locationselect}>찾기</button>
                    {isOpen && (
                        <div className={roomstyles.modal}>
                            <div className={roomstyles.modaltitle}><h2>정산 정보 변경</h2></div>
                            <div className={roomstyles.banktable}>
                                <div className={roomstyles.bank_table_container}>
                                        <label htmlFor="bank-select">은행 선택</label>
                                        <select id="bank-select" className={styles.select}>
                                            <option value="">은행 선택</option>
                                            <option value="nh">농협</option>
                                            <option value="kb">국민은행</option>
                                            <option value="shinhan">신한은행</option>
                                            <option value="woori">우리은행</option>
                                            <option value="hana">하나은행</option>

                                        </select>
                                    </div>
                                    <div className={roomstyles.bank_table_container}>

                                        <label htmlFor="account-number">계좌번호</label>
                                        <input
                                            id="account-number"
                                            type="text"
                                            className={styles.input}
                                            placeholder="계좌번호 입력"
                                        />
                                    </div>
                                        <button className={styles.button} onClick={closeModal}>변경</button>
                                    </div>




                            </div>
                        )}

                </div>
                <div className={styles.titledetail}><Hostdetail hosttitle="연습실 전화번호" hostcontent={<input/>}/></div>
            </div>
            <div className={styles.totalbutton}>
                <button  className={styles.button} onClick={handlecancell}>취소</button>
                <button className={styles.button} onClick={handlesubmit}>확인</button>
            </div>
        </div>
    );
};

export default Hostinfo;
