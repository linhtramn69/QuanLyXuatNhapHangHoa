import { } from '@fortawesome/free-regular-svg-icons';
import { faFilePdf, faPenToSquare, faPlus, faPrint } from '@fortawesome/free-solid-svg-icons';
import { Container, Table, Badge, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from '../../../../assets/style/formmanager.scss';
import { Link } from 'react-router-dom';
import { exportService, khoService } from '../../../../services/index';
import { useEffect, useState } from 'react';
import userService from '../../../../services/user.service';

const cx = classNames.bind(styles);
function ExportManager() {

    const [exports, setExports] = useState([]);
    const [kho, setKho] = useState([]);
    const [filter, setFilter] = useState("");
    const user = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        const fetchExports = async () => {
            await exportService.get().then((res) => {
                setExports(res.data);
            })
            await khoService.get().then((res) => {
                setKho(res.data)
            })
        };
        fetchExports();
    }, []);
    return (
        <>
            <Container className={cx('')}>
                <h2 className='text-center pb-3 pt-4 fw-bold'>PHIẾU XUẤT</h2>
                <div className={cx('filter')}>
                    <Row className={cx('py-4')}>
                        <Col md="6" sm="12" className={cx('d-flex')}>
                            <select onChange={(e) => setFilter(e.target.value)} className={cx('option-status')}>
                                <option value="">Tất cả</option>
                                <option value={0}>Đang xử lý</option>
                                <option value={1}>Đã xử lý</option>
                                <option value={-1}>Đã huỷ</option>
                            </select>
                            <input type="date" className={cx('option-time')} />
                        </Col>
                        <Col md="6" sm="12" className={cx('text-end col-btn-option')}>
                            <Link to="/qlkho/export-form">
                                <button className={cx('btn-excel')}>
                                    <FontAwesomeIcon className={cx('icon-btn')} icon={faPlus} />
                                    Thêm mới
                                </button>
                            </Link>
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
                <Table bordered hover className='text-center'>
                    <thead>
                        <tr>
                            <th>Trạng thái</th>
                            <th>Kho xuất</th>
                            <th>Nơi nhận hàng</th>
                            <th>Người lập phiếu</th>
                            <th>Thời gian</th>
                            <th>Tác vụ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exports.map((xuat) => {
                            if (xuat.noi_xuat_hang.ten_kho === user.noi_lam_viec.ten_kho) {
                                if (filter) {
                                    if (filter === xuat.status) {
                                        return (
                                            <tr>
                                                {(() => {
                                                    if (xuat.status === 0) {
                                                        return (<td><Badge bg="warning">Đang xử lý</Badge></td>)
                                                    } else if (xuat.status === 1) {
                                                        return <td><Badge bg="warning">Đang chuyển hàng</Badge></td>

                                                    } else if (xuat.status === 2) {
                                                        return <td><Badge bg="success">Đã nhận hàng</Badge></td>
                                                    }
                                                    else {
                                                        return <td><Badge bg="danger">Hủy nhận hàng</Badge></td>
                                                    }
                                                })()}
                                                <td>{xuat.noi_xuat_hang.ten_kho}</td>
                                                <td>{xuat.noi_nhan_hang.ten_cn}</td>
                                                <td>{xuat.nhanvien.ten_nhanvien}</td>
                                                <td>{xuat.thoigian}</td>
                                                <td>
                                                    <Link to={"/qlkho/form-export-detail/" + xuat._id}
                                                    >
                                                        <FontAwesomeIcon className={cx('btn-detail')} icon={faPenToSquare} />
                                                    </Link>
                                                </td>
                                            </tr>)
                                    }
                                } else return (
                                    <tr>
                                        {(() => {
                                            if (xuat.status === 0) {
                                                return (<td><Badge bg="warning">Đang xử lý</Badge></td>)
                                            } else if (xuat.status === 1) {
                                                return <td><Badge bg="warning">Đang chuyển hàng</Badge></td>

                                            } else if (xuat.status === 2) {
                                                return <td><Badge bg="success">Đã nhận hàng</Badge></td>
                                            }
                                            else if (xuat.status === -1) {
                                                return <td><Badge bg="danger">Hủy nhận hàng</Badge></td>
                                            }
                                            else {
                                                return <td><Badge bg="danger">Hủy yêu cầu</Badge></td>
                                            }
                                        })()}
                                        <td>{xuat.noi_xuat_hang.ten_kho}</td>
                                        <td>{xuat.noi_nhan_hang.ten_cn}</td>
                                        <td>{xuat.nhanvien.ten_nhanvien}</td>
                                        <td>{xuat.thoigian}</td>
                                        <td>
                                            <Link to={"/qlkho/form-export-detail/" + xuat._id}
                                            >
                                                <FontAwesomeIcon className={cx('btn-detail')} icon={faPenToSquare} />
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            }
                        })}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default ExportManager;
