import {useNavigate} from "react-router-dom";
import {NavDropdown} from "react-bootstrap";
import logout from "../../api/logout/Logout";

const Authorize = () => {
    
    const navigate = useNavigate();
    
    return (
        <NavDropdown title={localStorage.getItem('email')} id="basic-nav-dropdown">
            <NavDropdown.Item onClick={() => navigate("/profile")}>Профиль</NavDropdown.Item>
            <NavDropdown.Item onClick={logout}>Выйти</NavDropdown.Item>
        </NavDropdown>
    );
}


export default Authorize;