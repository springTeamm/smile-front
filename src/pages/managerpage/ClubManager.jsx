import React, { useState } from 'react';
import styles from "./UserManager.module.css";
import Pagecontroll from "../../components/manager/Pagecontroll";

import Selectcomponent from "../../components/host/Selectcomponent";

const ClubManagement = () => {
    // 검색 필드 설정
    const searchFields = [
        {
            name: 'clubName',
            label: '동아리 이름',
            type: 'text', // 텍스트 입력 필드
        },
        {
            name: 'representativeName',
            label: '대표자 이름',
            type: 'text',
        },
        {
            name: 'hostName',
            label: '호스트 이름',
            type: 'text',
        },
        {
            name: 'locationName',
            label: '장소명',
            type: 'text',
        },
        {
            name: 'representativePhone',
            label: '대표자 번호',
            type: 'text',
        },
        {
            name: 'hostPhone',
            label: '호스트 번호',
            type: 'text',
        }
    ];


    const initialClubs = [
        {
            id: 1,
            clubName: "동아리1",
            visitCount: 1,
            locationName: "장소1",
            hostName: "김이이",
            hostPhone: "010-1234-5678",
            representativeName: "김이이",
            lastVisit: "2023-10-10",
        },
        {
            id: 2,
            clubName: "동아리1",
            visitCount: 1,
            locationName: "장소1",
            hostName: "김이이",
            hostPhone: "010-1234-5678",
            representativeName: "김이이",
            lastVisit: "2023-10-10",
        },
        {
            id: 3,
            clubName: "동아리1",
            visitCount: 1,
            locationName: "장소1",
            hostName: "김이이",
            hostPhone: "010-1234-5678",
            representativeName: "김이이",
            lastVisit: "2023-10-10",
        },
    ];

    const [clubs, setClubs] = useState(initialClubs);
    const [selectedClubs, setSelectedClubs] = useState([]);

    const totalClubs = clubs.length;

    const handleSearch = (searchData) => {
        const filteredClubs = initialClubs.filter(club =>
            (searchData.clubNumber ? club.id.toString().includes(searchData.clubNumber) : true) &&
            (searchData.representativeName ? club.representativeName.includes(searchData.representativeName) : true) &&
            (searchData.hostName ? club.hostName.includes(searchData.hostName) : true) &&
            (searchData.locationName ? club.locationName.includes(searchData.locationName) : true) &&
            (searchData.representativePhone ? club.representativePhone.includes(searchData.representativePhone) : true) &&
            (searchData.hostPhone ? club.hostPhone.includes(searchData.hostPhone) : true)
        );
        setClubs(filteredClubs);
    };

    const handleReset = () => {
        setClubs(initialClubs);
    };

    const handleSelectClub = (id) => {
        setSelectedClubs(prevSelected =>
            prevSelected.includes(id) ? prevSelected.filter(clubId => clubId !== id) : [...prevSelected, id]
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}><Pagecontroll title="동아리 관리"/></div>
            <div className={styles.icon}>

            </div>
            <div className={styles.search_section}>
                <Selectcomponent
                    fields={searchFields}
                    onSearch={handleSearch}
                    onReset={handleReset}
                />
            </div>
            <div className={styles.title}><h3>동아리 목록(총 <span className={styles.totaluserHighlight}>{totalClubs}</span> 개)</h3></div>
            <div className={styles.table}>
            <div className={styles.table_container}>
                <table>
                    <thead>
                    <tr>
                        <th>선택</th>
                        <th>번호</th>
                        <th>동아리 이름</th>
                        <th>방문 횟수</th>
                        <th>장소명</th>
                        <th>호스트 명</th>
                        <th>호스트 전화번호</th>
                        <th>대표자명</th>
                        <th>마지막 방문일</th>
                    </tr>
                    </thead>
                    <tbody>
                    {clubs.map((club, index) => (
                        <tr key={club.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedClubs.includes(club.id)}
                                    onChange={() => handleSelectClub(club.id)}
                                />
                            </td>
                            <td>{index + 1}</td>
                            <td>{club.clubName}</td>
                            <td>{club.visitCount}</td>
                            <td>{club.locationName}</td>
                            <td>{club.hostName}</td>
                            <td>{club.hostPhone}</td>
                            <td>{club.representativeName}</td>
                            <td>{club.lastVisit}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    );
};

export default ClubManagement;
