
import {Outlet} from "react-router-dom";
import Sidebar from "../../components/manager/Sidebar";
import styles from "../managerpagecss/Cancellmanagement.module.css"
const ManagerPage = () => {
    return (

        <div className={styles.cancellcontainer}>
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <Sidebar/></div>

                    <div className={styles.contain}><Outlet/></div>

            </div>
        </div>

    );
};

export default ManagerPage;