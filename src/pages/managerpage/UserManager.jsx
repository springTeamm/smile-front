import React, { useEffect, useState } from 'react';

import Pagecontroll from "../../components/manager/Pagecontroll";

import styles from './UserManager.module.css';
import Selectcomponent from "../../components/host/Selectcomponent";
import Managericon from "../../components/manager/managericon";

const UserManager = () => {
    //api 호출 코드
    const [fields, setFields] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUserData = async ( ) => {
        try{
            const response = await fetch('http://localhost:5000/api/users');
            const data = await response.json();
            setFields(data);
            setLoading(false);
        } catch (error){
            console.log("fetch error", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    const text=[
        {
            name: 'userid',
            label: '회원 닉네임',
            type: 'text',
        }
    ]
    //프론트 예시 코드
/*    
    const fields = [
        {
            id: 1,
            usernumber: 1011,
            username: "홍길동",
            userid: "상큼젤리",
            hostsave: "Y",
            createdDate: "2023-01-15",
            usageCount: 12,
            reservationStatus: "진행 중",
            registeredRooms: 5
        },
        {
            id: 2,
            usernumber: 1022,
            username: "김철수",
            userid: "달콤캔디",
            hostsave: "N",
            createdDate: "2023-03-21",
            usageCount: 8,
            reservationStatus: "대기 중",
            registeredRooms: 0
        },
        {
            id: 3,
            usernumber: 1033,
            username: "박영희",
            userid: "반짝스타",
            hostsave: "Y",
            createdDate: "2022-11-07",
            usageCount: 20,
            reservationStatus: "완료",
            registeredRooms: 2
        }
    ] || [];
*/

    const totaluser= fields.length
    const hostuser = fields.filter(field => field.hostsave === "HOST").length;

    const saveroom = fields.reduce((total, field) => total + field.registeredRooms, 0);

    const handleSearch = (data) => {
        console.log("검색어:", fields);
    };

    const handleReset = () => {
        console.log("초기화");
    };

    const handleStatusChange = (status) => {
        // 선택한 방들의 상태 변경 (백엔드 연동 필요)
        alert(`선택한 방들을 ${status} 상태로 변경`);
    };
    const userstop=()=>{
        alert("중지시키는 백엔드 연동 필요")
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}><Pagecontroll title="회원 관리"/></div>
            <div className={styles.icon}><Managericon totaluser={totaluser} saveroom={saveroom} hostuser={hostuser}
                                                      rentalStopped={"2"} text1={"총 가입 회원"} text2={"호스트 회원"}
                                                      text3={"등록된 방 수"}/></div>
            <div className={styles.search_section}><Selectcomponent
                fields={text}
                onSearch={handleSearch}
                onReset={handleReset}
            />
            </div>
            <div className={styles.titledetail}><h3>회원 목록 (총 <span className={styles.totaluserHighlight}>{totaluser}</span>개)</h3></div>
            <div className={styles.table}>

                <div className={styles.table_container}>
                    <select onChange={(e) => handleStatusChange(e.target.value)} defaultValue="">
                        <option value="" disabled>상태 변경</option>
                        <option value="대여 중">대여 중</option>
                        <option value="대여 중지">대여 중지</option>
                    </select>
                    <table>

                        <thead>
                        <tr>
                            <th>번호</th>
                            <th>유저 번호</th>
                            <th>유저 이름</th>
                            <th>유저 닉네임</th>
                            <th>호스트 등록</th>
                            <th>계정 생성일</th>
                            <th>이용 횟수</th>
                            <th>예약 진행 여부</th>
                            <th>등록된 방 수</th>

                            <th>중지</th>
                        </tr>
                        </thead>
                        <tbody>
                        {fields.map((field, index) => (
                            <tr key={field.id}>
                                <td>{index + 1}</td>
                                <td>{field.userNum}</td>
                                <td>{field.userId}</td>
                                <td>{field.userNickname}</td>
                                <td>{field.userRights}</td>
                                <td>{field.userMakingTime}</td>
                                <td>{field.usingNum}</td>
                                <td>{field.registState}</td>
                                <td>{field.registRoom}</td>

                                <td>

                                        <button className={styles.button} onClick={userstop}>중지</button>

                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserManager;
