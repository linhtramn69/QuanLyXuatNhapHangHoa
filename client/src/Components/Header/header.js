import React from 'react';
import { Container } from 'react-bootstrap';
import { Nav, Form, Button, Navbar, InputGroup } from 'react-bootstrap';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Header({ showHeader }) {
    return (
        <Navbar expand="lg">
            <Container className="py-2">
                <Navbar.Brand>{/* <img src={images.logo_tach} /> */}</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="search my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <Form className="me-5 form-search">
                            <InputGroup>
                                <Form.Control placeholder="Search" />

                                <Button className="btn-search">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </Button>
                            </InputGroup>
                        </Form>

                        {/* <Nav.Link to="/">
                            <Nav.Item className="me-4">
                                <FontAwesomeIcon className="me-2" icon={faLocationDot} />
                                Tất cả chi nhánh
                            </Nav.Item>
                        </Nav.Link> */}
                        <Nav.Link to="/login">
                            <Nav.Item className="me-4">Login</Nav.Item>
                        </Nav.Link>

                        {/* <NavDropdown
                            title={
                                <span className='text-dark'>
                                    <FontAwesomeIcon className='me-2' icon={faCircleUser} />
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

export default React.memo(Header);
