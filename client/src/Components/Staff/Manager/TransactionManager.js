import { } from '@fortawesome/free-regular-svg-icons';
import {
    faCircleInfo,
    faFilePdf,
    faFileCsv,
    faPenToSquare,
    faTrash,
    faPrint,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Container, Table, Badge, Col, Row } from 'react-bootstrap';

import styles from '../../../assets/style/formmanager.scss';
const cx = classNames.bind(styles);
function TransactionManager() {
    return (
        <>
            <Container className={cx('')}>
                <div className={cx('filter')}>
                    <Row className={cx('py-4')}>
                        <Col md="6" sm="12" className={cx('d-flex')}>
                            <select className={cx('option-status')}>
                                <option>Trạng thái</option>
                                <option value="1">Đang xử lý</option>
                                <option value="2">Đã xử lý</option>
                                <option value="3">Đã huỷ</option>
                            </select>
                            <input type="date" className={cx('option-time')} />
                        </Col>
                        <Col md="6" sm="12" className={cx('text-end')}>
                            <button className={cx('btn-excel')}>
                                <FontAwesomeIcon className={cx('icon-btn')} icon={faFileCsv} />
                                Xuất Excel
                            </button>
                            <button className={cx('btn-pdf')}>
                                <FontAwesomeIcon className={cx('icon-btn')} icon={faFilePdf} />
                                Xuất PDF
                            </button>
                            <button className={cx('btn-save')}>
                                <FontAwesomeIcon className={cx('icon-btn')} icon={faPrint} />
                                Lưu và in
                            </button>
                        </Col>
                    </Row>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr className={cx('tr-head')}>
                            <th>ID</th>
                            <th>Loại phiếu</th>
                            <th>Trạng thái</th>
                            <th>Chi nhánh</th>
                            <th>Thời gian</th>
                            <th>Nhân viên</th>
                            <th>Tác vụ</th>
                            <th>Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>XUẤT</td>
                            <td>
                                <Badge bg="success">Đã xử lý</Badge>
                            </td>
                            <td>Chi nhánh Ninh Kiều, Cần Thơ</td>
                            <td>10/10/2022</td>
                            <td>Nguyễn Linh Trâm</td>
                            <td className='d-flex justify-content-center mt-2'>
                                <div className={cx('icon-edit text-success me-3')}>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </div>
                                <div className={cx('icon-delete text-danger')}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </div>
                            </td>
                            <td>
                                <div className={cx('icon-detail text-primary')}>
                                    <FontAwesomeIcon icon={faCircleInfo} />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>XUẤT</td>
                            <td>
                                <Badge bg="warning">Đang xử lý</Badge>
                            </td>
                            <td>Chi nhánh Ninh Kiều, Cần Thơ</td>
                            <td>10/10/2022</td>
                            <td>Nguyễn Linh Trâm</td>
                            <td className='d-flex justify-content-center mt-2'>
                                <div className={cx('icon-edit text-success me-3')}>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </div>
                                <div className={cx('icon-delete text-danger')}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </div>
                            </td>
                            <td>
                                <div className={cx('icon-detail text-primary')}>
                                    <FontAwesomeIcon icon={faCircleInfo} />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>XUẤT</td>
                            <td>
                                <Badge bg="danger">Đã huỷ</Badge>
                            </td>
                            <td>Chi nhánh Ninh Kiều, Cần Thơ</td>
                            <td>10/10/2022</td>
                            <td>Nguyễn Linh Trâm</td>
                            <td className='d-flex justify-content-center mt-2'>
                                <div className={cx('icon-edit text-success me-3')}>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </div>
                                <div className={cx('icon-delete text-danger')}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </div>
                            </td>
                            <td>
                                <div className={cx('icon-detail text-primary')}>
                                    <FontAwesomeIcon icon={faCircleInfo} />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>XUẤT</td>
                            <td>
                                <Badge bg="success">Đã xử lý</Badge>
                            </td>
                            <td>Chi nhánh Ninh Kiều, Cần Thơ</td>
                            <td>10/10/2022</td>
                            <td>Nguyễn Linh Trâm</td>
                            <td className='d-flex justify-content-center mt-2'>
                                <div className={cx('icon-edit text-success me-3')}>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </div>
                                <div className={cx('icon-delete text-danger')}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </div>
                            </td>
                            <td>
                                <div className={cx('icon-detail text-primary')}>
                                    <FontAwesomeIcon icon={faCircleInfo} />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>XUẤT</td>
                            <td>
                                <Badge bg="success">Đã xử lý</Badge>
                            </td>
                            <td>Chi nhánh Ninh Kiều, Cần Thơ</td>
                            <td>10/10/2022</td>
                            <td>Nguyễn Linh Trâm</td>
                            <td className='d-flex justify-content-center mt-2'>
                                <div className={cx('icon-edit text-success me-3')}>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </div>
                                <div className={cx('icon-delete text-danger')}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </div>
                            </td>
                            <td>
                                <div className={cx('icon-detail text-primary')}>
                                    <FontAwesomeIcon icon={faCircleInfo} />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>XUẤT</td>
                            <td>
                                <Badge bg="success">Đã xử lý</Badge>
                            </td>
                            <td>Chi nhánh Ninh Kiều, Cần Thơ</td>
                            <td>10/10/2022</td>
                            <td>Nguyễn Linh Trâm</td>
                            <td>
                                <a href="/" className={cx('icon-edit text-success')}>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </a>
                                <a href="/" className={cx('icon-delete text-danger')}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </a>
                            </td>
                            <td>
                                <a href="/" className={cx('icon-detail text-primary')}>
                                    <FontAwesomeIcon icon={faCircleInfo} />
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>XUẤT</td>
                            <td>
                                <Badge bg="success">Đã xử lý</Badge>
                            </td>
                            <td>Chi nhánh Ninh Kiều, Cần Thơ</td>
                            <td>10/10/2022</td>
                            <td>Nguyễn Linh Trâm</td>
                            <td>
                                <a href="/" className={cx('icon-edit text-success')}>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </a>
                                <a href="/" className={cx('icon-delete text-danger')}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </a>
                            </td>
                            <td>
                                <a href="/" className={cx('icon-detail text-primary')}>
                                    <FontAwesomeIcon icon={faCircleInfo} />
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>XUẤT</td>
                            <td>
                                <Badge bg="success">Đã xử lý</Badge>
                            </td>
                            <td>Chi nhánh Ninh Kiều, Cần Thơ</td>
                            <td>10/10/2022</td>
                            <td>Nguyễn Linh Trâm</td>
                            <td>
                                <a href="/" className={cx('icon-edit text-success')}>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </a>
                                <a href="/" className={cx('icon-delete text-danger')}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </a>
                            </td>
                            <td>
                                <a href="/" className={cx('icon-detail text-primary')}>
                                    <FontAwesomeIcon icon={faCircleInfo} />
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default TransactionManager;
