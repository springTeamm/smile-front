import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "../hostpagecss/Cancellmanagement.module.css";
import Managertitle from "../../components/host/managertitle";
import Searchcomponent from "../../components/host/Selectcomponent";

const Moneymanager = () => {
    const [salesData, setSalesData] = useState([]); // 전체 매출 데이터
    const [filteredSales, setFilteredSales] = useState([]); // 필터링된 데이터

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/hostpage/Moneymanager");
                setSalesData(response.data);
                setFilteredSales(response.data);
            } catch (error) {
                console.error("Failed to fetch sales data:", error);
            }
        };
        fetchSalesData();
    }, []);

    const searchFields = [
        { name: 'salesItem', label: '매출 항목', type: 'text' },
        { name: 'month', label: '월', type: 'text' },
    ];

    const handleSearch = (searchData) => {
        const filtered = salesData.filter(sale =>
            (searchData.salesItem ? sale.salesItem.includes(searchData.salesItem) : true) &&
            (searchData.month ? sale.month.includes(searchData.month) : true)
        );
        setFilteredSales(filtered);
    };

    const handleReset = () => {
        setFilteredSales(salesData);
    };

    const totalSales = filteredSales.length;

    return (
        <div className={styles.allcontain}>
            <div className={styles.title}>
                <Managertitle title={"매출 관리"} />
            </div>

            <div className={styles.search_section}>
                <Searchcomponent
                    fields={searchFields}
                    onSearch={handleSearch}
                    onReset={handleReset}
                />
            </div>

            <div className={styles.selecttotal}>
                <h3>매출 목록 (총 <span className={styles.totaluserHighlight}>{totalSales}</span>개)</h3>
            </div>

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
                        {filteredSales.map((sale, index) => (
                            <tr key={index}>
                                <td><input type="checkbox" /></td>
                                <td>{sale.month}</td>
                                <td>{sale.salesItem}</td>
                                <td>{sale.salesAmount.toLocaleString()}원</td>
                                <td>{sale.accumulatedSales.toLocaleString()}원</td>
                                <td>{sale.note}</td>
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
