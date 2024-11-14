import React from 'react';
import Select from "../../components/host/Select";
import Sidebar from "../../components/host/Sidebar";
import styles from "../hostpagecss/Cancellmanagement.module.css"
import Managertitle from "../../components/host/managertitle";
import Dateselect from "../../components/host/dateselect";
const Clubmanagement = () => {
    const clubData = [
        { id: 1, name: '음악 동아리', visitCount: 5, leader: '김철수', leaderPhone: '010-1234-5678', lastVisit: '2023-09-01' },
        { id: 2, name: '댄스 동아리', visitCount: 3, leader: '이영희', leaderPhone: '010-2345-6789', lastVisit: '2023-09-15' },
        { id: 3, name: '연극 동아리', visitCount: 8, leader: '박지훈', leaderPhone: '010-3456-7890', lastVisit: '2023-10-05' },
        { id: 4, name: '사진 동아리', visitCount: 2, leader: '최지우', leaderPhone: '010-4567-8901', lastVisit: '2023-10-20' },
    ]
    const totalRooms = clubData.length;

    return (
        <div className={styles.allcontain}>
            <div className={styles.title}><Managertitle title={"동아리 관리"}></Managertitle> </div>
            <div className={styles.search_section}><Select/></div>
            <div className={styles.selecttotal}><h3>동아리 목록 (총 {totalRooms}개)</h3></div>
                <div className={styles.table}>

                <div className={styles.table_container}>
                    <table>
                        <thead>
                        <tr>
                            <th>선택</th>
                            <th>번호</th>
                            <th>동아리 이름</th>
                            <th>방문 횟수</th>
                            <th>대표자명</th>
                            <th>대표자 전화번호</th>
                            <th>마지막 방문일</th>
                        </tr>
                        </thead>
                        <tbody>
                        {clubData.map((club) => (
                            <tr key={club.id}>
                                <td><input type="checkbox"/></td>
                                <td>{club.id}</td>
                                <td>{club.name}</td>
                                <td>{club.visitCount}</td>
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