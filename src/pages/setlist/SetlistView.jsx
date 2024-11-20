import React from 'react';
import SetListItem from './SetListItem';
import styles from '../../styles/SetListPage.module.css'; 

const SetListView = ({ items }) => {
    return (
        <div className={styles.setlistGrid}>
            {items.map((item) => (
                <SetListItem key={item.id} item={item} />
            ))}
        </div>
    );
};

export default SetListView;
