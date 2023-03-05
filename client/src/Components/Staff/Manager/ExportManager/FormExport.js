import className from 'classnames/bind';
import styles from '../../../../assets/style/form.scss';
import {
    faPrint,
    faBan,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Form, Col, InputGroup, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const cx = className.bind(styles);
function FormExport() {
    return (
        <>
            <Container className={cx('pb-5')}>
                <div className={cx('filter')}>
                    <Row className={cx('py-4 justify-content-end')}>
                        <Col md="6" className={cx('text-end')}>
                            <button className={cx('btn-pdf')}>
                                <FontAwesomeIcon className={cx('icon-btn')} icon={faBan} />
                                Xoá phiếu
                            </button>
                            <button className={cx('btn-save')}>
                                <FontAwesomeIcon className={cx('icon-btn')} icon={faPrint} />
                                Lưu và in
                            </button>
                        </Col>
                    </Row>
                </div>
                <Form className={cx('form-export')}>
                        <Row className="mb-3">
                            <Form.Group className={cx('form-group-export me-3')} as={Col}>
                                <Form.Label>ID phiếu</Form.Label>
                                <Form.Control type="text" placeholder="ID tự động" disabled />
                            </Form.Group>

                            <Form.Group className={cx('form-group-export me-3')} as={Col} controlId="formGridPassword">
                                <Form.Label>Thời gian</Form.Label>
                                <Form.Control type="datetime-local" placeholder="Password" />
                            </Form.Group>
                            <Form.Group className={cx('form-group-export me-3')} as={Col}>
                                <Form.Label>Chi nhánh</Form.Label>
                                <InputGroup className="mb-3">
                                    <Form.Control placeholder="Nguyễn Văn A" aria-describedby="basic-addon2" />
                                    {/* <button>
                                        <FontAwesomeIcon icon={faUserPlus} />
                                    </button> */}
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className={cx('form-group-export me-3')} as={Col} controlId="formGridPassword">
                                <Form.Label>Địa chỉ</Form.Label>
                                <Form.Control type="text" placeholder="Địa chỉ" />
                            </Form.Group>
                            <Form.Group className={cx('form-group-export')} as={Col} controlId="formGridPassword">
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control type="text" placeholder="Số điện thoại" />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group className={cx('form-group-export me-3')} as={Col}>
                                <Form.Label>Người nhận hàng</Form.Label>
                                <Form.Control type="text" placeholder="Người nhận hàng" />
                            </Form.Group>

                            <Form.Group className={cx('form-group-export me-3')} as={Col} controlId="formGridPassword">
                                <Form.Label>Người lập phiếu</Form.Label>
                                <Form.Control type="text" placeholder="Người lập phiếu" />
                            </Form.Group>
                            <Form.Group className={cx('form-group-export me-3')} as={Col} controlId="formGridPassword">
                                <Form.Label>Diễn giải</Form.Label>
                                <Form.Control type="text" placeholder="Diễn giải" />
                            </Form.Group>
                            <Form.Group className={cx('form-group-export me-3')} as={Col} controlId="formGridPassword">
                                <Form.Label>Chọn giá bán</Form.Label>
                                {['radio'].map((type) => (
                                    <div key={`inline-${type}`}>
                                        <Form.Check
                                            className={cx('form-check-input-type')}
                                            inline
                                            label="Giá bán sỉ"
                                            name="group1"
                                            type={type}
                                            id={`inline-${type}-1`}
                                        />
                                        <Form.Check
                                            className={cx('form-check-input-type')}
                                            inline
                                            label="Giá bán lẻ"
                                            name="group1"
                                            type={type}
                                            id={`inline-${type}-2`}
                                        />
                                    </div>
                                ))}
                            </Form.Group>
                        </Row>
                </Form>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ width: '30%' }}>Hàng hoá xuất bán</th>
                            <th>Đơn vị tính</th>
                            <th>Số lượng</th>
                            <th>Đơn giá xuất</th>
                            <th>Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input type="text" />
                            </td>
                            <td>
                                {' '}
                                <input type="text" />
                            </td>
                            <td>
                                {' '}
                                <input type="text" />
                            </td>
                            <td>
                                <input type="text" />
                            </td>
                            <td>
                                <input type="text" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" />
                            </td>
                            <td>
                                {' '}
                                <input type="text" />
                            </td>
                            <td>
                                {' '}
                                <input type="text" />
                            </td>
                            <td>
                                <input type="text" />
                            </td>
                            <td>
                                <input type="text" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" />
                            </td>
                            <td>
                                {' '}
                                <input type="text" />
                            </td>
                            <td>
                                {' '}
                                <input type="text" />
                            </td>
                            <td>
                                <input type="text" />
                            </td>
                            <td>
                                <input type="text" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" />
                            </td>
                            <td>
                                {' '}
                                <input type="text" />
                            </td>
                            <td>
                                {' '}
                                <input type="text" />
                            </td>
                            <td>
                                <input type="text" />
                            </td>
                            <td>
                                <input type="text" />
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className="text-start add-row">
                                <Link
                                    to="/create_export
                                "
                                >
                                    Thêm mới
                                </Link>
                            </td>
                            <th colspan="2">Tổng cộng</th>
                            <th>Tiền hàng</th>
                            <td>
                                <input type="text" value="315000" />
                            </td>
                        </tr>
                        <tr>
                            <th colspan="3" rowSpan="3"></th>
                            <th>Đã thanh toán</th>
                            <td>
                                <input type="text" value="15000" />
                            </td>
                        </tr>
                        <tr>
                            <th>Hình thức thanh toán</th>
                            <td className={cx('form-check-input-type')}>
                                {['radio'].map((type) => (
                                    <div key={`inline-${type}`} className="mb-3 mt-4">
                                        <Form.Check
                                            inline
                                            label="Tiền mặt"
                                            name="group1"
                                            type={type}
                                            id={`inline-${type}-1`}
                                            style={{ width: '10%;' }}
                                        />
                                        <Form.Check
                                            inline
                                            label="Chuyển khoản"
                                            name="group1"
                                            type={type}
                                            id={`inline-${type}-2`}
                                        />
                                    </div>
                                ))}
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <Link to="/create_export">
                                    <button className={cx('btn-save-add')}>Thêm phiếu</button>
                                </Link>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </Container>
        </>
    );
}

export default FormExport;
