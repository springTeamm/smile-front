import React from 'react';
import styles from "./Hostdetail.module.css"
const Hostdetail = ({hosttitle,hostcontent}) =>{
    return(
        <div className={styles.hostdetailcontent}>
            <div className={styles.detailtitle}>
                <h4>{hosttitle}</h4>
            </div>
            <div className={styles.detailconstent}>
                <p>{hostcontent}</p>
            </div>
        </div>
    );
};
export default Hostdetail;