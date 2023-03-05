import { Container } from 'react-bootstrap';
import { Nav, Form, Button, Navbar, InputGroup } from 'react-bootstrap';
import { faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Header.scss';
//import { images } from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function Header() {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand>{/* <img src={images.logo_tach} /> */}</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className={cx('search my-2 my-lg-0')} style={{ maxHeight: '100px' }} navbarScroll>
                        <Form className={cx('me-5 form-search')}>
                            <InputGroup>
                                <Form.Control placeholder="Search" />

                                <Button className={cx('btn-search')}>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </Button>
                            </InputGroup>
                        </Form>

                        <Nav.Link to="/login">
                            <Nav.Item className={cx('me-4')}>
                                <FontAwesomeIcon className={cx('me-2')} icon={faLocationDot} />
                                {user.noi_lam_viec.ten_cn}
                            </Nav.Item>
                        </Nav.Link>
                        <Nav.Link to="/login">
                            <Nav.Item className={cx('me-4')}>{user.ten_nhanvien}</Nav.Item>
                        </Nav.Link>
                        {/* <NavDropdown
                            title={
                                <span className={cx('text-dark')}>
                                    <FontAwesomeIcon className={cx('me-2')} icon={faCircleUser} />
                                    Admin
                                </span>
                            }
                            id="navbarScrollingDropdown"
                        >
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
