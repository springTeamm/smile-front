import React from 'react';
import Select from "../../components/host/Select";

import styles from "../hostpagecss/Cancellmanagement.module.css"
import Managertitle from "../../components/host/managertitle";

const Moneymanager = () => {
    const moneymenu = [
        { id: 1, name: '음악 동아리', visitCount: 5, leader: '김철수', leaderPhone: '010-1234-5678', lastVisit: '2023-09-01' },
        { id: 2, name: '댄스 동아리', visitCount: 3, leader: '이영희', leaderPhone: '010-2345-6789', lastVisit: '2023-09-15' },
        { id: 3, name: '연극 동아리', visitCount: 8, leader: '박지훈', leaderPhone: '010-3456-7890', lastVisit: '2023-10-05' },
        { id: 4, name: '사진 동아리', visitCount: 2, leader: '최지우', leaderPhone: '010-4567-8901', lastVisit: '2023-10-20' },
    ]
    const totalmoney = moneymenu.length;

    return (
        <div className={styles.allcontain}>
            <div className={styles.title}><Managertitle title={"매출 관리"}></Managertitle> </div>
            <div className={styles.search_section}><Select/></div>
            <div className={styles.selecttotal}><h3>월 별 매출 관리 목록 (총 {totalmoney}개)</h3></div>
            <div className={styles.table}>

                <div className={styles.table_container}>
                    <table>
                        <thead>
                        <tr>
                            <th>선택</th>
                            <th>월</th>
                            <th>매출 항목</th>
                            <th>매출액</th>
                            <th>누적 매출</th>
                            <th>비고</th>

                        </tr>
                        </thead>
                        <tbody>
                        {moneymenu.map((money) => (
                            <tr key={money.id}>
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
export default Moneymanager;