import React, { useEffect, useState } from 'react';
import styles from '../hostpagecss/Cancellmanagement.module.css';
import axios from 'axios';
import Managertitle from '../../components/host/managertitle';
import Hostdetail from '../../components/host/Hostdetail';

const Hostinfo = () => {
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
        locationName: "정보 없음",
    });

    useEffect(() => {
        const fetchHostInfo = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/hostpage/hostinfo?hostNum=1');
                console.log(response.data); // 데이터 확인
                setHostInfo(response.data);
            } catch (error) {
                console.error("Error fetching host info:", error);
            }
        };

        fetchHostInfo();
    }, []);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/api/ocr/host', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("OCR Response:", response.data);
            alert("파일 업로드 및 OCR 성공!");
        } catch (error) {
            console.error("Error during file upload or OCR:", error);
            alert("파일 업로드 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className={styles.hostcontain}>
            <div className={styles.title}>
                <Managertitle title="호스트 정보" />
            </div>
            <div className={styles.hostdetailscroll}>
                <div className={styles.titledetail}><Managertitle title="호스트 정보" /></div>
                <div className={styles.titledetail}><Hostdetail hosttitle="호스트 유형" hostcontent="국내 사업자" /></div>
                <div className={styles.titledetail}><Hostdetail hosttitle="상호" hostcontent="00 연습실" /></div>
                <div className={styles.titledetail}><Hostdetail hosttitle="사업장 소재지" hostcontent={hostInfo.hostBisAddress} /></div>
                <div className={styles.titledetail}><Hostdetail hosttitle="사업자 등록 번호" hostcontent={hostInfo.hostRegistNum} /></div>
                <div className={styles.titledetail}><Hostdetail hosttitle="사업자 업종" hostcontent={hostInfo.hostBisType} /></div>
                <div className={styles.titledetail}><Hostdetail hosttitle="기업 이름" hostcontent={hostInfo.hostCompanyName} /></div>
                <div className={styles.titledetail}><Hostdetail hosttitle="법인 이름" hostcontent={hostInfo.hostCorpName} /></div>
                <div className={styles.titledetail}><Hostdetail hosttitle="과세 유형" hostcontent={hostInfo.hostTaxType || "정보 없음"} /></div>
                <div className={styles.titledetail}><Hostdetail hosttitle="대표자 이름" hostcontent={hostInfo.userName || "정보 없음"} /></div>
            </div>
            <div className={styles.hostdetailscroll}>
                <div className={styles.titledetail}><Managertitle title="담당자 정보" /></div>
                <div className={styles.titledetail}><Hostdetail hosttitle="이름" hostcontent={hostInfo.representativeName} /></div>
                <div className={styles.titledetail}><Hostdetail hosttitle="로그인 ID" hostcontent={hostInfo.userId} /></div>
                <div className={styles.titledetail}><Hostdetail hosttitle="이메일" hostcontent={hostInfo.userEmail} /></div>
                <div className={styles.titledetail}><Hostdetail hosttitle="전화번호" hostcontent={hostInfo.userPhone} /></div>
            </div>

            <div className={styles.hostdetailscroll}>
                <div className={styles.titledetail}><Managertitle title="연습실 정보" /></div>
                <div className={styles.titledetail}><Hostdetail hosttitle="장소 이름" hostcontent={hostInfo.locationName} /></div>
            </div>

            <div className={styles.fileUploadSection}>
                <h3>사업자 등록 파일 업로드</h3>
                <form>
                    <input type="file" name="file" onChange={handleFileChange} />
                </form>
            </div>
        </div>
    );
};

export default Hostinfo;
