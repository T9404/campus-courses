import {useNavigate} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";
import Authorize from "../authorize/Authorize";


function Header() {
    const authenticated = !!localStorage.getItem('token');
    
    useNavigate();
    
    return (
        <Navbar expand="lg" className="bg-body-tertiary shadow p-3 mb-5 bg-body rounded">
            <Container>
                <Navbar.Brand>Кампусные курсы</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {authenticated ? (
                            <>
                                <Nav.Link href="/post/create">Группы курсов</Nav.Link>
                                {localStorage.getItem('roles').isTeacher === true ? (
                                    <Nav.Link href="/teacher">Преподаваемые курсы</Nav.Link>
                                ) : (
                                    <></>
                                )}
                                {localStorage.getItem('roles').isStudent === true ? (
                                    <Nav.Link href="/student">Мои курсы</Nav.Link>
                                ) : (
                                    <></>
                                )}
                            </>
                        ) : (
                            <></>
                        )}
                    </Nav>
                    <Nav className="ml-auto">
                        {authenticated ? (
                            <>
                                <Nav.Link><Authorize /></Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link href="/registration">Регистрация</Nav.Link>
                                <Nav.Link href="/login">Вход</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
    
}

export default Header;