import {Link} from "react-router-dom";
import styles from './style.module.css';

const NotFoundPage = () => {
    return (
        <>
            <div className={styles.container}>
                <h1>404 - Page Not Found</h1>
                <p>Sorry, there is nothing to see here</p>
                <div className={styles.links}>
                    <Link href='/' className={styles.link} to={'/'}>
                        Homepage
                    </Link>
                </div>
            </div>
        </>
    );
};

export default NotFoundPage;