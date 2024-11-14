import React from 'react';
import SetListItem from './SetListItem';

const SetListView = ({ items }) => {
    return (
        <div className="setlist-grid">
            {items.map((item) => (
                <SetListItem key={item.id} item={item} />
            ))}
        </div>
    );
};

export default SetListView;
