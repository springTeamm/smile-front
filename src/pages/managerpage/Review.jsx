import React from 'react';
import Select from "../../components/manager/Select";
import Sidebar from "../../components/manager/Sidebar";

const review = () => {
    return(
        <div className="chat">
            <Select/>
            <div><Sidebar/></div>
        </div>
    );
};
export default review;