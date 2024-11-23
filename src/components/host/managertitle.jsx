import React from 'react';
import styles from './hosticon.module.css';
const managertitle = ({title}) => {
    return (
        <div className={styles.title}><h2>{title}</h2></div>
    )
}
export default managertitle;