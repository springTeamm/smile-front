import React, { useState } from 'react';
import styles from '../hostpagecss/Cancellmanagement.module.css';

import Managertitle from '../../components/host/managertitle';
import Hostdetail from '../../components/host/Hostdetail';
import roomstyles from '../hostpagecss/Roomstyle.module.css';

const Hostinfo = () => {
    const [isOpen, setIsOpen] = useState(false);

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
                <div className={styles.titledetail}><Managertitle title="호스트 정보" /></div>
                <div className={styles.titledetail}><Hostdetail hosttitle="호스트 유형" hostcontent="국내 사업자" /></div>
                <div className={styles.titledetail}><Hostdetail hosttitle="상호" hostcontent="00 연습실" /></div>
                <div className={styles.titledetail}><Hostdetail hosttitle="사업자 등록 번호1" hostcontent="000-00-00000" /></div>
                <div className={styles.titledetail}><Hostdetail hosttitle="사업자 등록 번호2" hostcontent="000-00-00000" /></div>
                <div className={styles.titledetail}><Hostdetail hosttitle="사업장 소재지1" hostcontent="(우:12345) 서울특별시 노원구 공릉동머시기" /></div>
                <div className={styles.titledetail}><Hostdetail hosttitle="사업장 소재지2" hostcontent="(우:12345) 서울특별시 노원구 공릉동머시기" /></div>
                <div className={styles.titledetail}><Hostdetail hosttitle="사업자 구분" hostcontent="개인 사업자" /></div>
                <div className={styles.titledetail}><Hostdetail hosttitle="업종" hostcontent="각종 연습실 대여 외" /></div>
                <div className={styles.titledetail}><Hostdetail hosttitle="통신 판매업 신고 번호" hostcontent="2020-노원공릉동-0000" /></div>
                <div className={styles.titledetail}><Hostdetail hosttitle="대표자 이름" hostcontent="김김김" /></div>
            </div>
            <div className={styles.hostdetailscroll}>
                <div className={styles.titledetail}><Managertitle title="담당자 정보" /></div>
                <div className={styles.titledetail}><Hostdetail hosttitle="이름" hostcontent="김*이" /></div>
                <div className={styles.titledetail}><Hostdetail hosttitle="로그인ID" hostcontent="asdf****" /></div>
                <div className={styles.titledetail}><Hostdetail hosttitle="이메일 주소" hostcontent="asdf**@naver.com" /></div>
                <div className={styles.titledetail}><Hostdetail hosttitle="휴대폰 번호" hostcontent="010-11**-11**" /></div>
                <div className={styles.titledetail}><Hostdetail hosttitle="비밀번호" hostcontent={<input type="password" />} /></div>
                <div className={styles.titledetail}><Hostdetail hosttitle="비밀번호 확인" hostcontent={<input type="password" />} /></div>
            </div>

            <div className={styles.hostdetailscroll}>
                <div className={styles.titledetail}><Managertitle title="연습실 정보" /></div>
                <div className={styles.titledetail}><Hostdetail hosttitle="연습실 주소" hostcontent={<input />} />

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
