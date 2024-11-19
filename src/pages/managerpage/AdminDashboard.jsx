import React from 'react';
import {Outlet} from "react-router-dom";
import styles from "./UserManager.module.css"
const AdminDashboard = () => {

    return(
        <div className={styles.totalcontain}>
        <Outlet/>
        </div>
    );
};
export default AdminDashboard;