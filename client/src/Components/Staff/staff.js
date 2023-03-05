import Header from './Header/header';
import Sidebar from './Sidebar/sidebar';
import { Col, Container, Row } from 'react-bootstrap';
import React from 'react';
import { Outlet } from 'react-router-dom';

function Staff() {
    return (
        <div className="wrapper">
            <header style={{ zIndex: 1 }}>
                <Header />
            </header>
            <div style={{ zIndex: 1000 }}>
                <Container fluid className="content">
                    <Row md={2} xs={1} className="">
                        <Col className="col-sidebar" style={{ width: '20%' }}>
                            <Sidebar />
                        </Col>
                        <Col className="col-content" style={{ width: '80%' }}>
                            <Outlet />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Staff;
