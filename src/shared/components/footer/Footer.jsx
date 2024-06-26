import styles from './style.module.css';
import {MDBFooter} from "mdb-react-ui-kit";

function Footer() {
        return (
            <MDBFooter className='text-center text-white' style={{ backgroundColor: '#caced1' }}>
                <footer className={`${styles.footer}`}>
                    <div className="container">
                        <span className="text-muted">&copy; 2024 - Кампусные курсы{' '}</span>
                    </div>
                </footer>
            </MDBFooter>
        );
}

export default Footer;