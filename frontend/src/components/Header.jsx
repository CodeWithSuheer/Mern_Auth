import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import NavLink from 'react-bootstrap/esm/NavLink';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaSignInAlt } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth);

    const [logoutApiCall] = useLogoutMutation();

    // LOGOUT HANDLER
    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/');
        } catch (error) {
            console.log('Error logging out', error);
        }
    }


    return (
        <Navbar bg="dark" expand="lg" variant='dark' collapseOnSelect>
            <Container>
                {/* ----------- NAVBAR LOGO ----------- */}
                <LinkContainer to="/">
                    <Navbar.Brand href="#">MERN Auth</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto my-2 my-lg-0">
                        {/* ----------- CHECK HERE --> IF LOGIN THEN PROFILE BUTTON IF NOT THEN SIGN BUTTONS ----------- */}
                        {userInfo ? (<>
                            <NavDropdown title={userInfo.name} id='username' style={{ textTransform: 'capitalize' }}>
                                <LinkContainer to="/profile">
                                    <NavDropdown.Item>
                                        Profile
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </>) : (<>
                            {/* ----------- LOGIN BUTTON ----------- */}
                            <LinkContainer to="/login">
                                <Nav.Link>Sign In</Nav.Link>
                            </LinkContainer>
                            {/* ----------- SIGN UP BUTTON ----------- */}
                            <LinkContainer to="/register">
                                <Nav.Link>Sign Up</Nav.Link>
                            </LinkContainer>
                        </>)}

                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;


