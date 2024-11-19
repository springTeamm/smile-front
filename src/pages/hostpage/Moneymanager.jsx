import React, { useEffect, useState } from 'react';
import styles from "../hostpagecss/Cancellmanagement.module.css"
import Managertitle from "../../components/host/managertitle";
import Searchcomponent from "../../components/host/Selectcomponent";

const Moneymanager = () => {
    const initialSalesData = [
        { id: 1, month: '2023-01', salesItem: '연습실 대여', salesAmount: '1,000,000원', accumulatedSales: '5,000,000원', note: '정상' },
        { id: 2, month: '2023-02', salesItem: '장비 대여', salesAmount: '500,000원', accumulatedSales: '5,500,000원', note: '정상' },
        { id: 3, month: '2023-03', salesItem: '연습실 대여', salesAmount: '1,200,000원', accumulatedSales: '6,700,000원', note: '정상' },
    ];

    const [filteredSales, setFilteredSales] = useState(initialSalesData);

    const searchFields = [
        { name: 'id', label: '매출 항목 번호', type: 'text' },
    ];

    const handleSearch = (searchData) => {
        const filtered = initialSalesData.filter(sale =>
            searchData.id ? String(sale.id).includes(searchData.id) : true
        );
        setFilteredSales(filtered);
    };

    const handleReset = () => {
        setFilteredSales(initialSalesData);
    };

    const totalSales = filteredSales.length;

    return (
        <div className={styles.allcontain}>
            <div className={styles.title}><Managertitle title={"매출 관리"} /></div>

            <div className={styles.search_section}>
                <Searchcomponent
                    fields={searchFields}
                    onSearch={handleSearch}
                    onReset={handleReset}
                />
            </div>

            <div className={styles.selecttotal}><h3>매출 목록 (총 {totalSales}개)</h3></div>

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
                        {filteredSales.map((sale) => (
                            <tr key={sale.id}>
                                <td><input type="checkbox" /></td>
                                <td>{sale.month}</td>
                                <td>{sale.salesItem}</td>
                                <td>{sale.salesAmount}</td>
                                <td>{sale.accumulatedSales}</td>
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