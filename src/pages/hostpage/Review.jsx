import React from 'react';
import Select from "../../components/host/Select";

import styles from "../hostpagecss/Cancellmanagement.module.css";
import Managertitle from "../../components/host/managertitle";

const review = () => {
    const reviews=[
        { id: 1, locationName: '장소1', roomName: '방이름명1', userName: '김이이', starNum: '⭐ ⭐ ⭐ ⭐ ⭐'},
        { id: 2, locationName: '장소1', roomName: '방이름명1',userName: '김이이', starNum: '⭐ ⭐ ⭐ ⭐ ⭐' },
        { id: 3, locationName: '장소1', roomName: '방이름명1', userName: '김이이', starNum: '⭐ ⭐ ⭐ ⭐ ⭐' },
    ];
    const handlesave =()=>{
        //
    }
    const totalreview = reviews.length
    return (


        <div className={styles.allcontain}>
            <div className={styles.title}><Managertitle title={"리뷰 관리"}></Managertitle> </div>
            <div className={styles.search_section}><Select/></div>
            <div className={styles.selecttotal}><h3>리뷰 목록 (총 {totalreview}개)</h3></div>
            <div className={styles.table}>

                <div className={styles.table_container}>
                    <table>
                        <thead>
                        <tr>
                            <th>선택</th>
                            <th>번호</th>
                            <th>답글</th>
                            <th>장소명</th>
                            <th>방 이름</th>
                            <th>작성자명</th>
                            <th>평점</th>
                        </tr>
                        </thead>
                        <tbody>
                        {reviews.map((review) => (
                            <tr key={(review.id)}>
                                <td><input type="checkbox"/></td>
                                <td>{review.id}</td>
                                <td>{<button className={styles.su} onClick={handlesave}>등록</button>}</td>
                                <td>{review.locationName}</td>
                                <td>{review.roomName}</td>
                                <td>{review.userName}</td>
                                <td>{review.starNum}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
};
export default review;