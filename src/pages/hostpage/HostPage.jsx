
import {Outlet} from "react-router-dom";
import Sidebar from "../../components/host/Sidebar";
import styles from "../hostpagecss/Cancellmanagement.module.css"
const HostPage = () => {
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

export default HostPage;