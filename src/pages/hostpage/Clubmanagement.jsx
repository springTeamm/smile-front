import React, { useState } from 'react';
import Searchcomponent from "../../components/host/Selectcomponent"; // 검색 컴포넌트 적용
import styles from "../hostpagecss/Cancellmanagement.module.css";
import Managertitle from "../../components/host/managertitle";

const Clubmanagement = () => {
    const initialClubData = [
        { id: 1, name: '음악 동아리', visitCount: 5, roomName: 'A룸', leader: '김철수', leaderPhone: '010-1234-5678', lastVisit: '2023-09-01' },
        { id: 2, name: '댄스 동아리', visitCount: 3, roomName: 'B룸', leader: '이영희', leaderPhone: '010-2345-6789', lastVisit: '2023-09-15' },
        { id: 3, name: '연극 동아리', visitCount: 8, roomName: 'C룸', leader: '박지훈', leaderPhone: '010-3456-7890', lastVisit: '2023-10-05' },
        { id: 4, name: '사진 동아리', visitCount: 2, roomName: 'D룸', leader: '최지우', leaderPhone: '010-4567-8901', lastVisit: '2023-10-20' },
    ];

    const [filteredData, setFilteredData] = useState(initialClubData);

    const searchFields = [
        { name: 'name', label: '동아리 이름', type: 'text' },
        { name: 'leader', label: '대표자명', type: 'text' },
        { name: 'roomName', label: '방 이름', type: 'text' },
        { name: 'leaderPhone', label: '대표자 전화번호', type: 'text' },
    ];

    const handleSearch = (searchData) => {
        const filtered = initialClubData.filter(club =>
            (searchData.name ? club.name.includes(searchData.name) : true) &&
            (searchData.leader ? club.leader.includes(searchData.leader) : true) &&
            (searchData.roomName ? club.roomName.includes(searchData.roomName) : true) &&
            (searchData.leaderPhone ? club.leaderPhone.includes(searchData.leaderPhone) : true)
        );
        setFilteredData(filtered);
    };

    const handleReset = () => {
        setFilteredData(initialClubData);
    };
    const totalclub=initialClubData.length;

    return (
        <div className={styles.allcontain}>
            <div className={styles.title}><Managertitle title={"동아리 관리"} /></div>

            <div className={styles.search_section}>
                <Searchcomponent
                    fields={searchFields}
                    onSearch={handleSearch}
                    onReset={handleReset}
                />
            </div>

            <div className={styles.selecttotal}>
               <h3>동아리 목록(총 {totalclub}개)</h3>
            </div>

            <div className={styles.table}>
                <div className={styles.table_container}>
                    <table>
                        <thead>
                        <tr>
                            <th>선택</th>
                            <th>번호</th>
                            <th>동아리 이름</th>
                            <th>방문 횟수</th>
                            <th>방 이름</th>
                            <th>대표자명</th>
                            <th>대표자 전화번호</th>
                            <th>마지막 방문일</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredData.map((club) => (
                            <tr key={club.id}>
                                <td><input type="checkbox" /></td>
                                <td>{club.id}</td>
                                <td>{club.name}</td>
                                <td>{club.visitCount}</td>
                                <td>{club.roomName}</td>
                                <td>{club.leader}</td>
                                <td>{club.leaderPhone}</td>
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

export default Clubmanagement;
